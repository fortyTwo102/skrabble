import { ROW, COLUMN } from "../Initializer"
import { wordList } from "../Words"

export function getWordsEndingOnCursor(cursor, board) {

    let possibleWords = new Set()
    let cursorX = cursor[1]
    let cursorY = cursor[0]

    // a. vertical
    // find startY

    let startY = 0

    for(let index = cursorY - 1; index >= 0; index--){
        if (board[index][cursorX]['keyVal'] === ''){
            startY = index + 1
            break
        }
    }
    
    // find endY

    let endY = cursorY

    for(let index = cursorY + 1; index < COLUMN; index++){
        if (board[index][cursorX]['keyVal'] === ''){
            break
        }
        endY = index
    }

    console.log("startY", startY, "endY", endY)

    // find possible word combinations

    for(let sindex = startY; sindex <= endY; sindex++){
        for(let eindex = endY; eindex >= sindex; eindex--){
            let combOfLetters = {
                "word": '',
                "location": []
            }
            for(let y = sindex; y <= eindex; y++){
                combOfLetters["word"] += board[y][cursorX]['keyVal']
                combOfLetters["location"].push([y, cursorX])
            }
            if (combOfLetters["word"].length > 0){
                possibleWords.add(JSON.stringify(combOfLetters))
            }
        }
    }
    
    // a. horizontal
    // find startX

    let startX = 0

    for(let index = cursorX - 1; index >= 0; index--){
        if (board[cursorY][index]['keyVal'] === ''){
            startX = index + 1
            break
        }
    }
    
    // find endX

    let endX = cursorX

    for(let index = cursorX + 1; index < ROW; index++){
        if (board[cursorY][index]['keyVal'] === ''){
            break
        }
        endX = index
    }

    console.log("startX", startX, "endX", endX)

    // find possible word combinations

    for(let sindex = startX; sindex <= endX; sindex++){
        for(let eindex = endX; eindex >= sindex; eindex--){
            let combOfLetters = Object.create(null)
            combOfLetters.word = ''
            combOfLetters.location = []
            for(let x = sindex; x <= eindex; x++){
                combOfLetters["word"] += board[cursorY][x]['keyVal']
                combOfLetters["location"].push([cursorY, x])
            }
            if (combOfLetters["word"].length > 0){
                possibleWords.add(JSON.stringify(combOfLetters))
            }
        }    
    }
    // console.log(possibleWords)
    let newWordsMadeTemp = new Set()
    possibleWords.forEach(possibleWord => {
        // console.log(possibleWord)
        let possibleWordObj = JSON.parse(possibleWord)
        if (wordList.includes(possibleWordObj["word"])){
            console.log("Word found " + possibleWordObj["word"])
            newWordsMadeTemp.add(JSON.stringify(possibleWordObj))
        }
    });

    return newWordsMadeTemp

}