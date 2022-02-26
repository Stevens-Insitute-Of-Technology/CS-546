function isArgumentPassed(args) {
  if (typeof args === "undefined") {
    throw "Please pass an argument";
  }
}

function stringLengthCheck(val) {
  if (val.length === 0) {
    throw "Please Enter a String";
  }
}

function stringTypeCheck(val) {
  if (typeof val !== "string") {
    throw "Please pass a string";
  }
}

function isUpperCase(char) {
  if (char.charCodeAt() > 64 && char.charCodeAt() < 91) {
    return true;
  }
}

function isLowercase(char) {
  if (char.charCodeAt() > 96 && char.charCodeAt() < 123) {
    return true;
  }
}

function isNumber(char) {
  if (char.charCodeAt() > 47 && char.charCodeAt() < 58) {
    return true;
  }
}

function checkIsProperNumber(val) {
  if (typeof val !== "number") {
    throw `${val} is not a number`;
  }

  if (isNaN(val)) {
    throw `${val} is NaN`;
  }
}

function isSpace(val) {
  if (val === " ") {
    return true;
  }
}

function checkEmptyString(val) {
  val = val.trim();
  if (val.length == 0) {
    throw "This is an empty string.";
  }
}

function validIndex(str, idx) {
  if (idx === 0 || idx == str.length) {
    throw "Please provide valid index.";
  }
}

function mergeStrings(str1, str2) {
  let resString = "";
  for (let index = 0; index < str1.length; index++) {
    resString = resString + str1[index] + str2[index];
  }
  return resString;
}

/**
 * Given a string, you will return the sorted string.
 * You will sort the string from uppercase to lowercase, any special characters, numbers, and then spaces.
 */
const sortString = (str) => {
  isArgumentPassed(str);
  stringTypeCheck(str);
  stringLengthCheck(str);
  checkEmptyString(str);
  let splitStr = str.split("");
  let arrWithUpperCase = [];
  let arrWithLowerCase = [];
  let arrWithNumbers = [];
  let arrWithSpaces = [];
  let arrWithSymbols = [];
  splitStr.forEach((element) => {
    if (isUpperCase(element)) {
      arrWithUpperCase.push(element);
    } else if (isLowercase(element)) {
      arrWithLowerCase.push(element);
    } else if (isSpace(element)) {
      arrWithSpaces.push(element);
    } else if (isNumber(element)) {
      arrWithNumbers.push(element);
    } else {
      arrWithSymbols.push(element);
    }
  });
  arrWithUpperCase.sort();
  arrWithLowerCase.sort();
  arrWithNumbers.sort();
  let resultArr = [
    arrWithUpperCase,
    arrWithLowerCase,
    arrWithSymbols,
    arrWithNumbers,
    arrWithSpaces,
  ];
  resultArr = resultArr.concat.apply([], resultArr);
  let finalSortedString = resultArr.join("");
  return finalSortedString;
};

/**
 * Given string and index, you will find the value from the string index, then you will replace any characters in the string that are the same as that value except for that string index value.
 * You will grab the value before and after the index and those are the values that you will be alternating between when replacing the characters.
 */
const replaceChar = (str, idx) => {
  isArgumentPassed(str);
  isArgumentPassed(idx);
  stringLengthCheck(str);
  stringTypeCheck(str);
  checkEmptyString(str);
  checkIsProperNumber(idx);
  validIndex(str, idx);
  let bStr = str.charAt(idx - 1);
  let mainChar = str.charAt(idx);
  let aStr = str.charAt(idx + 1);
  let toggleStr = true;
  str = str.split("");
  for (let index = 0; index < str.length; index++) {
    if (index !== idx) {
      if (str[index] == mainChar) {
        if (toggleStr) {
          str[index] = bStr;
          toggleStr = false;
        } else {
          str[index] = aStr;
          toggleStr = true;
        }
      }
    }
  }
  str = str.join("");
  return str;
};

/**
 * Given string1 and string2 return the concatenation of the two strings, with alternating characters of both strings.
 * Note: If the strings are not the same length, you will pad the one that has less characters with the char parameter (you only use the 3rd parameter if string1 and string2 are not the same length
 * For example: "Patrick" and "Hill", "Hill" has 3 characters less than "Patrick" so you would pad "Hill" with the character supplied as the 3rd char parameter
 */
const mashUp = (str1, str2, ch) => {
  isArgumentPassed(str1);
  isArgumentPassed(str2);
  isArgumentPassed(ch);
  stringTypeCheck(str1);
  stringTypeCheck(str2);
  stringTypeCheck(ch);
  checkEmptyString(str1);
  checkEmptyString(str2);
  checkEmptyString(ch);
  if (ch.length > 1) {
    throw "Char should be of length 1";
  }
  str1 = str1.split("");
  str2 = str2.split("");
  if (str1.length < str2.length) {
    for (let index = str1.length; index < str2.length; index++) {
      str1.push(ch);
    }
  } else if (str1.length > str2.length) {
    for (let index = str2.length; index < str1.length; index++) {
      str2.push(ch);
    }
  }
  str1 = str1.join("");
  str2 = str2.join("");
  let mergeStringsAlternate = mergeStrings(str1, str2);
  return mergeStringsAlternate;
};

module.exports = {
  sortString,
  replaceChar,
  mashUp,
};
