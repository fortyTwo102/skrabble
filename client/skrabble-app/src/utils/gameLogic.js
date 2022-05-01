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
    
    // console.log("x" ,startY, cursorX)

    for(startY; startY <= cursorY; startY++){
        let combOfLetters = ''
        for(let y = startY; y <= cursorY; y++){
            combOfLetters += board[y][cursorX]['keyVal']
        }
        possibleWords.add(combOfLetters)
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
    
    // console.log("x" ,startX, cursorX)

    for(startX; startX <= cursorY; startX++){
        let combOfLetters = ''
        for(let x = startX; x <= cursorX; x++){
            combOfLetters += board[cursorY][x]['keyVal']
        }
        possibleWords.add(combOfLetters)
    }

    console.log(possibleWords)

}