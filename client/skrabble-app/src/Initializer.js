export const ROW = 6;
export const COLUMN = 6;

const tempCounter = []

for (let index = 0; index < COLUMN; index++){
    tempCounter.push(index)
}

export const mainBoardDefault = Array(6).fill().map(()=>tempCounter.map(function (i) { return {
    "keyVal": "",
    "player": "",
    "alive": true,
    "cursor": false,
    "partOfWord": false
}}))

// export const mainBoardDefault = [
//     [boardElement, boardElement, boardElement, boardElement, boardElement, boardElement], 
//     [boardElement, boardElement, boardElement, boardElement, boardElement, boardElement], 
//     [boardElement, boardElement, boardElement, boardElement, boardElement, boardElement], 
//     [boardElement, boardElement, boardElement, boardElement, boardElement, boardElement], 
//     [boardElement, boardElement, boardElement, boardElement, boardElement, boardElement],
//     [boardElement, boardElement, boardElement, boardElement, boardElement, boardElement],
// ]

export const boardDefault = [
    ["", "", "", "", "", ""], 
    ["", "", "", "", "", ""], 
    ["", "", "", "", "", ""], 
    ["", "", "", "", "", ""], 
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
]

export const colorBoardDefault = [
    ["", "", "", "", "", ""], 
    ["", "", "", "", "", ""], 
    ["", "", "", "", "", ""], 
    ["", "", "", "", "", ""], 
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
]

export const letterStyleBoardDefault = [
    ["letter-glow", "letter", "letter", "letter", "letter", "letter"], 
    ["letter", "letter", "letter", "letter", "letter", "letter"],
    ["letter", "letter", "letter", "letter", "letter", "letter"],
    ["letter", "letter", "letter", "letter", "letter", "letter"],
    ["letter", "letter", "letter", "letter", "letter", "letter"],
    ["letter", "letter", "letter", "letter", "letter", "letter"]
]

export const tallyDefault = {
    'player-one': 0,
    'player-two': 0
  }