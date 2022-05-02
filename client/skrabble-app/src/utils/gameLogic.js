export function getWordsEndingOnCursor(cursor, board) {

    let possibleWords = new Set()
    let cursorX = cursor[1]
    let cursorY = cursor[0]

    // a. vertical
    // find startY

    let startY = 0

    for(let index = cursorY - 1; index >= 0; index--){
        // console.log(index, cursorX)
        if (board[index][cursorX]['keyVal'] === ''){
            startY = index + 1
            break
        }
    }
    
    // find endY

    let endY = cursorY

    for(let index = cursorY + 1; index <= 5; index++){
        if (board[index][cursorX]['keyVal'] === ''){
            break
        }
        endY = index
    }

    console.log("startY", startY, "endY", endY)

    // find possible word combinations

    for(let sindex = startY; sindex <= endY; sindex++){
        for(let eindex = endY; eindex >= sindex; eindex--){
            let combOfLetters = ''
            for(let y = sindex; y <= eindex; y++){
                combOfLetters += board[y][cursorX]['keyVal']
            }
            if (combOfLetters.length > 0){
                possibleWords.add(combOfLetters)
            }
        }
        
    }
    
    // a. horizontal
    // find startX

    let startX = 0

    for(let index = cursorX - 1; index >= 0; index--){
        // console.log(index, cursorX)
        if (board[cursorY][index]['keyVal'] === ''){
            startX = index + 1
            break
        }
    }
    
    // find endX

    let endX = cursorX

    for(let index = cursorX + 1; index <= 5; index++){
        if (board[cursorY][index]['keyVal'] === ''){
            break
        }
        endX = index
    }

    console.log("startX", startX, "endX", endX)

    // find possible word combinations

    for(let sindex = startX; sindex <= endX; sindex++){
        for(let eindex = endX; eindex >= sindex; eindex--){
            let combOfLetters = ''
            for(let x = sindex; x <= eindex; x++){
                combOfLetters += board[cursorY][x]['keyVal']
            }
            if (combOfLetters.length > 0){
                possibleWords.add(combOfLetters)
            }
        }
        
    }

    return possibleWords

}