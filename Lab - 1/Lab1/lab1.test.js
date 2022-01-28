const lab1 = require("./lab1");

// =========================================================Question 1=========================================================
console.log(lab1.questionOne([5, 3, 10]));
//returns and outputs: {'18': false, '2': true, '93': false}

console.log(lab1.questionOne([2]));
// returns and outputs: {'3': true}

console.log(lab1.questionOne([]));
// returns and outputs: {}

console.log(lab1.questionOne());
// returns and outputs: {}

console.log(lab1.questionOne([766, 2133]));
// returns and outputs: { '586749': false, '4549682': false }

// =========================================================Question 2=========================================================
console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1]));
//returns and outputs: [1]

console.log(lab1.questionTwo([1, "1", 1, "1", 2]));
// returns and outputs: [1, '1', 2]

console.log(lab1.questionTwo([3, "a", "b", 3, "1"]));
// returns and outputs: [3, 'a', 'b', '1']

console.log(lab1.questionTwo([]));
//returns and outputs: []

console.log(lab1.questionTwo([2, "2", "777", 777, "77", "66", "66"]));
//returns and outputs: [ 2, '2', '777', 777, '77', '66' ]

// =========================================================Question 3=========================================================
console.log(lab1.questionThree(["cat", "act", "foo", "bar"]));
// returns and outputs: { act: ["cat", "act"] }

console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
// returns and outputs: { acer: ["race", "care"] }

console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
// returns and outputs: {}

console.log(lab1.questionThree([]));
// returns and outputs: {}

console.log(
  lab1.questionThree(["race", "care", "abc", "abc", "def", "fde", "kkk", "fed"])
);
// returns and outputs: { acer: [ 'race', 'care' ], def: [ 'def', 'fde', 'fed' ] }

// =========================================================Question 4=========================================================
console.log(lab1.questionFour(1, 3, 2));
//returns and outputs: 4

console.log(lab1.questionFour(2, 5, 6));
//returns and outputs: 194

console.log(lab1.questionFour(3, 3, 3));
//returns and outputs: 6

console.log(lab1.questionFour(7, 10, 9));
//returns and outputs: 461160

console.log(lab1.questionFour(5, 12, 13));
//returns and outputs: 670602252
