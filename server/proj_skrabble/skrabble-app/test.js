const removeDuplicatesFromArrayByProperty = (arr, prop) => arr.reduce((accumulator, currentValue) => {
    if(!accumulator.find(obj => obj[prop] === currentValue[prop])){
      accumulator.push(currentValue);
    }
    return accumulator;
  }, [])

  
arrx = [
  {
    word: "ABC",
    id: 1,
  },
  {
    word: "ABC",
    id: 2,
  },
  {
    word: "ABCXS",
    id: 3,
  },
];


console.log(removeDuplicatesFromArrayByProperty(arrx, "word"))