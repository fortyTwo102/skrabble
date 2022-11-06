import { getWordsEndingOnCursor } from "./gameLogic";
import { ROW, COLUMN } from "../Initializer";

export async function getLetterToPlay(board, wordsMade) {
  let activePlayer = "";
  let bestPointsAchieved = -1;
  let bestCursorPosition = [[0,0]];
  let bestLetter = ""
  let cursors = [];
  let letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  for (let row = 0; row < ROW; row++){
    for (let column = 0; column < COLUMN; column++)
    {
        if (board[row][column]["keyVal"]){
            console.log("LETTER HERE")
        } else {
            cursors.push([row, column])
        }
    }
  }

//   console.log(board)
//   console.log(cursors)

  const forEachLoop = async (_) => {
    for (let l_index = 0; l_index < letters.length; l_index++) {
      for (let c_index = 0; c_index < cursors.length; c_index++) {
        let newBoard = JSON.parse(JSON.stringify(board));

        let row = cursors[c_index][0]
        let column = cursors[c_index][1]
        let points = 0;

        newBoard[row][column]["keyVal"] = letters[l_index]
        // console.log("AI PUTTING " + letters[l_index] + " in " + row + "x" + column)
        let newWordsMade = await getWordsEndingOnCursor(
          cursors[c_index],
          newBoard,
          wordsMade,
          activePlayer
        );

        console.log("NWM:")
        console.log(newWordsMade)

        newBoard[row][column]["keyVal"] = ""
        
        // console.log(newWordsMade)
        newWordsMade.forEach((newWordMade) => {
          let newWordMadeObj = JSON.parse(newWordMade);
          points += newWordMadeObj["word"].length;
        });

        if (points > bestPointsAchieved) {
          bestCursorPosition = cursors[c_index]
          bestLetter = letters[l_index]
          bestPointsAchieved = points
        }
      }
    }
  };

  await forEachLoop();

  // console.log(bestLetter, bestCursorPosition)

  return [bestLetter, bestCursorPosition[0], bestCursorPosition[1]];

}
