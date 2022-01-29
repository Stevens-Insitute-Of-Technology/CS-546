// Method to check if the passed argument is an array or not.
function checkIfThisIsAnArray(arr) {
  if (!Array.isArray(arr)) {
    throw `${arr} is not an array.`;
  }
}

// Method to check if the argument is passed or not.
function isArgumentPassed(args) {
  if (typeof args === "undefined") {
    throw "Please pass an argument";
  }
}

// to check if array has any data or not.
function isArrayEmpty(arr) {
  if (arr.length == 0) {
    throw "Please add values inside the array.";
  }
}

// Method to check if the values passed is a number or not
function checkIsProperNumber(val) {
  if (typeof val !== "number") {
    throw `${val} is not a number`;
  }

  if (isNaN(val)) {
    throw `${val} is NaN`;
  }
}

// Method to check if the passed argument is a number or char
function checkIsProperNumberOrChar(val) {
  if (typeof val === "number") {
    return true;
  } else if (
    typeof val === "string" &&
    val.length === 1 &&
    ((val.charCodeAt() > 64 && val.charCodeAt() < 91) ||
      (val.charCodeAt() > 96 && val.charCodeAt() < 123))
  ) {
    return true;
  } else {
    throw `${val} is not valid type`;
  }
}

// Method to find average of elements of an array.
function findAverageOfArray(arr) {
  let sum = 0;
  let length = arr.length;
  arr.forEach((element) => {
    sum = sum + element;
  });
  return Math.round(sum / length);
}

// Method to check if the argument is a lower case character
function checkLowerCase(char) {
  if (char.charCodeAt() > 96 && char.charCodeAt() < 123) {
    return true;
  }
}

function isUpperCase(char) {
  if (char.charCodeAt() > 64 && char.charCodeAt() < 91) {
    return true;
  }
}

/**
 * Given an array of arrays, you will return the rounded average value of all elements in the array.
 */
const average = (arr) => {
  isArgumentPassed(arr);
  checkIfThisIsAnArray(arr);
  isArrayEmpty(arr);
  let totalArrayLength = arr.length;
  let nestedAvg = 0;
  arr.forEach((element) => {
    checkIfThisIsAnArray(element);
    isArrayEmpty(element);
    element.forEach((e) => {
      checkIsProperNumber(e);
    });
    let avgOfNested = findAverageOfArray(element);
    nestedAvg = nestedAvg + avgOfNested;
    avgOfNested = 0;
  });
  return Math.round(nestedAvg / totalArrayLength);
};

/**
 * Returns the mode value of the elements of an array squared.
 * As the function name states,  it's the mode squared, so you will first find the mode and then square it!
 * If there is no mode, you will return 0. If there are multiple modes, you will sum the square of them.
 */
const modeSquared = (arr) => {
  isArgumentPassed(arr);
  checkIfThisIsAnArray(arr);
  isArrayEmpty(arr);
  let modeObj = {}; // to store the frequency of each element in the array
  let max = 0;
  arr.forEach((element) => {
    checkIsProperNumber(element);
    if (modeObj[element]) {
      modeObj[element] = modeObj[element] + 1;
    } else {
      modeObj[element] = 1;
    }
    if (modeObj[element] > max) {
      max = modeObj[element];
    }
  });
  // base case if there is no mode available.
  if (max === 1) {
    return 0;
  }
  let tempArr = [];
  for (let e in modeObj) {
    if (modeObj[e] == max) {
      tempArr.push(parseInt(e));
    }
  }
  // for single mode just return the square and for multiple return the sum of individual squares.
  if (tempArr.length == 1) {
    return tempArr[0] * tempArr[0];
  } else {
    let num = 0;
    tempArr.forEach((element) => {
      let a = element * element;
      num = num + a;
    });
    return num;
  }
};

/**
 * Scan the array from one end to the other to find the median element.
 * Return both the median element of the array and the index (original position) of this element as a new object with the value as the key and the index as the value.
 * If the array has an even length, you will take the average of the two elements as the key and the higher index as the value.
 * Note: If there are multiple elements that are the same as the median, take the first index of it.
 */
const medianElement = (arr) => {
  isArgumentPassed(arr);
  checkIfThisIsAnArray(arr);
  isArrayEmpty(arr);
  const cArr = [...arr];
  arr = arr.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
  arr.forEach((element) => {
    checkIsProperNumber(element);
  });
  let lengthOfArray = arr.length;
  const middleIndex = Math.floor(lengthOfArray / 2);
  let median = 0;
  let resultObj = {};
  if (lengthOfArray % 2 == 0) {
    median = (arr[middleIndex - 1] + arr[middleIndex]) / 2;
    resultObj[median] = cArr.indexOf(arr[middleIndex]);
  } else {
    median = arr[middleIndex];
    resultObj[median] = cArr.indexOf(median);
  }
  return resultObj;
};

/**
 * Given two arrays, you will return one sorted array.
 * Each element can either be a number or a character.
 * You will first sort alphabetically (lowercase to uppercase) and then numerically.
 */
const merge = (arr1, arr2) => {
  isArgumentPassed(arr1);
  isArgumentPassed(arr2);
  checkIfThisIsAnArray(arr1);
  checkIfThisIsAnArray(arr2);
  isArrayEmpty(arr1);
  isArrayEmpty(arr2);
  let arrWithNumbers = [];
  let arrWithLowerChar = [];
  let arrWithUpperChar = [];
  let arrWithNumbers2 = [];
  let arrWithLowerChar2 = [];
  let arrWithUpperChar2 = [];
  arr1.forEach((element) => {
    if (checkIsProperNumberOrChar(element)) {
      if (typeof element === "number" || !isNaN(element)) {
        arrWithNumbers.push(element);
      } else if (checkLowerCase(element)) {
        arrWithLowerChar.push(element);
      } else if (isUpperCase(element)) {
        arrWithUpperChar.push(element);
      }
    }
  });
  arr2.forEach((element) => {
    if (checkIsProperNumberOrChar(element)) {
      if (typeof element === "number" || !isNaN(element)) {
        arrWithNumbers2.push(element);
      } else if (checkLowerCase(element)) {
        arrWithLowerChar2.push(element);
      } else if (isUpperCase(element)) {
        arrWithUpperChar2.push(element);
      }
    }
  });
  arrWithLowerChar = arrWithLowerChar.concat(arrWithLowerChar2);
  arrWithUpperChar = arrWithUpperChar.concat(arrWithUpperChar2);
  arrWithNumbers = arrWithNumbers.concat(arrWithNumbers2);
  arrWithLowerChar.sort();
  arrWithUpperChar.sort();
  arrWithNumbers.sort();
  let resultObj = [arrWithLowerChar, arrWithUpperChar, arrWithNumbers];
  resultObj = resultObj.concat.apply([], resultObj);
  return resultObj;
};

module.exports = {
  average,
  modeSquared,
  medianElement,
  merge,
};
