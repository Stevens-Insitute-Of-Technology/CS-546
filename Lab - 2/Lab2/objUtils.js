function isArgumentPassed(args) {
  if (typeof args === "undefined") {
    throw "Please pass an argument";
  }
}

function checkIfThisIsAnArray(arr) {
  if (!Array.isArray(arr)) {
    throw `${arr} is not an array.`;
  }
}

function checkIfTypeFunction(val) {
  if (typeof val !== "function") {
    throw `${val} is not a type function.`;
  }
}

function checkIfThisIsAnObject(val) {
  if (typeof val !== "object") {
    throw `${val} is not an Object type.`;
  }
  if (Array.isArray(val)) {
    throw `${val} is not an Object type.`;
  }
}

function checkIfThisIsAnEmptyObject(myObj) {
  if (Object.keys(myObj).length === 0) {
    throw `${myObj} is empty`;
  }
}

function isArrayEmpty(arr) {
  if (arr.length == 0) {
    throw "Please add values inside the array.";
  }
}

function checkIfObjectValueIsANumber(val) {
  for (const k in val) {
    checkIsProperNumber(val[k]);
  }
}

function checkIsProperNumber(val) {
  if (typeof val !== "number") {
    throw `${val} is type of ${typeof val}. Please enter a type number`;
  }

  if (isNaN(val)) {
    throw `${val} is type of NaN. Please enter a proper number`;
  }
}

/**
 * This method will take in an array of objects and a function, and will return one object.
 * You must check that each value is a number type.
 * You will evaluate the function on the values of the object, if multiple objects have the same key, you will add that value to the current value.
 * The return object will not have any duplicated keys.
 */
const computeObjects = (myArrayObj, myFunction) => {
  checkIfThisIsAnArray(myArrayObj);
  isArrayEmpty(myArrayObj);
  checkIfTypeFunction(myFunction);
  let resutlObj = {};
  myArrayObj.forEach((element) => {
    checkIfThisIsAnObject(element);
    checkIfThisIsAnEmptyObject(element);
    checkIfObjectValueIsANumber(element);
    for (const key in element) {
      if (resutlObj[key]) {
        resutlObj[key] = resutlObj[key] + element[key];
      } else {
        resutlObj[key] = element[key];
      }
    }
  });
  for (const key in resutlObj) {
    resutlObj[key] = myFunction(resutlObj[key]);
  }
  return resutlObj;
};

/**
 * This method will return a new object with key-value pairs that exist in both objects.
 * Objects as values are valid.
 * If no common keys are found, return an empty object.
 */
const commonKeys = (myObj1, myObj2) => {
  checkIfThisIsAnObject(myObj1);
  checkIfThisIsAnObject(myObj2);
  isArgumentPassed(myObj1);
  isArgumentPassed(myObj2);
  let resultObj = {};
  let obj1Keys = Object.keys(myObj1);
  for (const key in myObj1) {
    if (obj1Keys.includes(key)) {
      if (typeof myObj1[key] === "object") {
        resultObj[key] = commonKeys(myObj1[key], myObj2[key]);
      } else if (myObj1[key] === myObj2[key]) {
        resultObj[key] = myObj1[key];
      }
    }
  }
  return resultObj;
};

/**
 * Given an object, you will return a new object where the values are now the keys and the keys are now the value.
 * If a value has a type of array, for each element, you will have the element as the key and the value will be the original key.
 * If a value has an object, you will flip those keys and values as well, but keep the key as the same.
 */
const flipObject = (myObj) => {
  let resultObj = {};
  checkIfThisIsAnObject(myObj);
  checkIfThisIsAnEmptyObject(myObj);
  for (const key in myObj) {
    if (Array.isArray(myObj[key])) {
      myObj[key].forEach((element) => {
        resultObj[element] = key;
      });
    } else if (typeof myObj[key] === "object") {
      resultObj[key] = flipObject(myObj[key]);
    } else {
      resultObj[myObj[key]] = key;
    }
  }
  return resultObj;
};

module.exports = {
  computeObjects,
  commonKeys,
  flipObject,
};
