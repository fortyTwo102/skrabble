import { ROW, COLUMN } from "../Initializer";

export function isWordTaken(word, wordsMade) {
  let isWordTakenFlag = false;

  // console.log("word: " + word)
  // console.log("wordsMade: ")
  // console.log(wordsMade)
  // console.log(wordsMade.length)

  wordsMade.forEach((wordMade) => {
    let wordMadeJSON = JSON.parse(wordMade);
    if (wordMadeJSON["word"] === word) {
      console.log("Word: " + word + " is already taken.");
      isWordTakenFlag = true;
    }
  });
  return isWordTakenFlag;
}

export async function isEnglishWord(word) {
  // let x = ''
  // let apiObj = new EndpointCall()

  // let apiResp = callApi(word)

  // apiResp.then(function(apiRespResult) {
  //     console.log("sending from isEnglishWord: ", apiRespResult.result);
  //     x = apiRespResult.result
  //     return apiRespResult.result
  // })

  var CONFIG = require("../config.json");

  const wordResponse = fetch(
    `https://${
      CONFIG["ALLOWED_HOSTS"]["dev"]
    }/api/word?q=${word.toLowerCase()}`
  )
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse.result;
    });

  let returnResult = async function () {
    return await wordResponse;
  };

  let final_resp = await returnResult();

  // console.log("the result for " + word + " is " + final_resp + " of type " + typeof(final_resp))

  return final_resp;
}

export async function getWordsEndingOnCursor(cursor, board, wordsMade, activePlayer) {
  let possibleWords = new Set();
  let cursorX = cursor[1];
  let cursorY = cursor[0];

  // a. vertical
  // find startY
  let startY = 0;

  for (let index = cursorY - 1; index >= 0; index--) {
    if (board[index][cursorX]["keyVal"] === "") {
      startY = index + 1;
      break;
    }
  }

  // find endY

  let endY = cursorY;

  for (let index = cursorY + 1; index < COLUMN; index++) {
    if (board[index][cursorX]["keyVal"] === "") {
      break;
    }
    endY = index;
  }

  // console.log("startY", startY, "endY", endY)

  // find possible word combinations

  for (let sindex = startY; sindex <= endY; sindex++) {
    for (let eindex = endY; eindex >= sindex; eindex--) {
      let combOfLetters = {
        word: "",
        location: [],
      };
      for (let y = sindex; y <= eindex; y++) {
        combOfLetters["word"] += board[y][cursorX]["keyVal"];
        combOfLetters["location"].push([y, cursorX]);
      }
      if (combOfLetters["word"].length > 0) {
        possibleWords.add(JSON.stringify(combOfLetters));
      }
    }
  }

  // a. horizontal
  // find startX

  let startX = 0;

  for (let index = cursorX - 1; index >= 0; index--) {
    if (board[cursorY][index]["keyVal"] === "") {
      startX = index + 1;
      break;
    }
  }

  // find endX

  let endX = cursorX;

  for (let index = cursorX + 1; index < ROW; index++) {
    if (board[cursorY][index]["keyVal"] === "") {
      break;
    }
    endX = index;
  }

  console.log("startX", startX, "endX", endX);

  // find possible word combinations

  for (let sindex = startX; sindex <= endX; sindex++) {
    for (let eindex = endX; eindex >= sindex; eindex--) {
      let combOfLetters = Object.create(null);
      combOfLetters.word = "";
      combOfLetters.location = [];
      for (let x = sindex; x <= eindex; x++) {
        combOfLetters["word"] += board[cursorY][x]["keyVal"];
        combOfLetters["location"].push([cursorY, x]);
      }
      if (combOfLetters["word"].length > 0) {
        possibleWords.add(JSON.stringify(combOfLetters));
      }
    }
  }

  // find how many of these letter combinations are actual english words

  let newWordsMadeTemp = new Set();

  const forEachLoop = async (_) => {
    
    let possibleWordsList = [...possibleWords];
    
    for (let index = 0; index < possibleWordsList.length; index++) {
    
      let possibleWord = possibleWordsList[index];
      let possibleWordObj = JSON.parse(possibleWord);
      possibleWordObj["player"] = activePlayer;
      let isEnglishWordReturns = await isEnglishWord(possibleWordObj["word"]);
      let isWordTakenReturns = isWordTaken(possibleWordObj["word"], wordsMade);

      // console.log("isEnglishWord: " + isEnglishWordReturns)
      // console.log("isWordTaken: " + isWordTakenReturns)

      if (isEnglishWordReturns && !isWordTakenReturns) {
        console.log("Word found " + possibleWordObj["word"]);
        newWordsMadeTemp.add(JSON.stringify(possibleWordObj));
      }
    }
  };

  await forEachLoop();

  return newWordsMadeTemp;
}
