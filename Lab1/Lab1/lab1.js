/**
 * Utility method for questionOne
 * Method to check if the number passed is prime or not prime.
 */
function isPrimeTrue(element) {
  let count = 0;
  for (let index = 2; index * index <= element; index++) {
    // optimized to check numebrs till square root
    if (element % index == 0) {
      count++;
      break;
    }
  }
  return count == 0 ? true : false;
}
const questionOne = function questionOne(arr) {
  // Implement question 1 here
  let resultObject = {};
  if (arr) {
    for (let index = 0; index < arr.length; index++) {
      let element = arr[index];
      element = Math.abs(element * element - 7);
      if (isPrimeTrue(element)) {
        resultObject[element] = true;
      } else {
        resultObject[element] = false;
      }
    }
  }
  return resultObject;
};

const questionTwo = function questionTwo(arr) {
  // Implement question 2 here
  if (Array.isArray(arr)) {
    return Array.from(new Set(arr));
  } else {
    return [];
  }
};

const questionThree = function questionThree(arr) {
  // Implement question 3 here
  let anagramsList = {}; // declare a result object
  arr.forEach((element) => {
    let sortedString = element.split("").sort().join(""); // sort each element after iterating
    if (anagramsList[sortedString]) {
      return anagramsList[sortedString].push(element); // if key exists then push into object
    }
    anagramsList[sortedString] = [element];
  });
  for (let anagrams in anagramsList) {
    anagramsList[anagrams] = Array.from(new Set(anagramsList[anagrams]));
    if (anagramsList[anagrams].length < 2) {
      delete anagramsList[anagrams];
    }
  }
  return anagramsList;
};
/**
 * Utility method for questionFour
 * This method will return factorial of a number
 * This method is implemented using recursion
 */
function getFactorialOfAnyNumber(num) {
  if (num == 0) {
    return 1;
  }
  if (num == 1) {
    return num;
  }
  return num * getFactorialOfAnyNumber(num - 1);
}

const questionFour = function questionFour(num1, num2, num3) {
  // Implement question 4 here
  let factNum1 = getFactorialOfAnyNumber(num1);
  let factNum2 = getFactorialOfAnyNumber(num2);
  let factNum3 = getFactorialOfAnyNumber(num3);
  let sumOfFactorials = (factNum1 + factNum2 + factNum3);
  let avgOfInitialInput = (num1 + num2 + num3) / 3;
  return Math.floor(sumOfFactorials / avgOfInitialInput);
};

module.exports = {
  firstName: "SIDDHARTH",
  lastName: "GULATI",
  studentId: "10468179",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
