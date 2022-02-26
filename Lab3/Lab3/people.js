const axios = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data;
}

function checkIfArgumentIsPassed(val) {
  if (typeof val === "undefined") {
    throw `Please pass an input.`;
  }
}

function checkIfInputIsString(val) {
  if (typeof val !== "string") {
    throw `${val} is not a string. Please pass a string`;
  }
}

function checkIfIdParamterIsARealValue(val) {
  if (val.trim() === "") {
    throw `Please pass correct value.`;
  }
}

function checkIsProperNumber(val) {
  if (typeof val === "string") {
    let temp = val;
    val = parseInt(val);
    if (isNaN(val)) {
      throw `${temp} is not a valid input`;
    }
    checkIsProperNumber(val);
  }
  if (typeof val !== "number") {
    throw `${val} is not a number`;
  }

  if (isNaN(val)) {
    throw `${val} is NaN`;
  }
}

function makeTwoDigits(n) {
  n = Number(n);
  return (n < 10 ? "0" : "") + n;
}

function checkIfMonthIsValid(month) {
  if (Number(month) < 1 || Number(month) > 12) {
    throw `${month} is not a valid month.`;
  }
}

function checkIfDayIsValid(month, day) {
  month = Number(month);
  day = Number(day);
  //   let monthWith31Days = [1, 3, 5, 7, 8, 10, 12];
  let monthWith30Days = [4, 6, 9, 11];
  if (day < 1 || day > 31) {
    throw `${day} is not a valid day.`;
  }
  if (monthWith30Days.indexOf(month) > -1 && day > 30) {
    throw `Month ${month} does not have ${day} days`;
  }
  if (month === 2 && day > 28) {
    throw `Month ${month} does not have ${day} days`;
  }
}
/**
 * This will return the person for the specified id within the people.json array.
 * Note: The id is case sensitive.
 */
const getPersonById = async (idNumber) => {
  checkIfArgumentIsPassed(idNumber);
  checkIfInputIsString(idNumber);
  checkIfIdParamterIsARealValue(idNumber);
  idNumber = idNumber.trim();
  let peopleObj = await getPeople();
  let resultObj = peopleObj.find((x) => x.id === idNumber);
  if (typeof resultObj === "undefined") {
    throw `Person not found`;
  }
  if (Object.keys(resultObj).length > 0) {
    return resultObj;
  }
};

/**
 * For this function, you will return an array of people objects who live or work on the same street name with the same suffix from people.json BOTH the street name and the street suffix MUST match! You must return at least two people, so if there are not 2 or more people that live on the same street for the parameters provided you will throw an error.
 */
const sameStreet = async (streetName, streetSuffix) => {
  checkIfArgumentIsPassed(streetName);
  checkIfInputIsString(streetName);
  checkIfArgumentIsPassed(streetSuffix);
  checkIfInputIsString(streetSuffix);
  checkIfIdParamterIsARealValue(streetName);
  checkIfIdParamterIsARealValue(streetSuffix);
  streetName = streetName.trim();
  streetSuffix = streetSuffix.trim();
  let peopleObj = await getPeople();
  let homeArray = [];
  let workArray = [];
  peopleObj.forEach((element) => {
    let { home, work } = element.address;
    if (
      home.street_name.toLowerCase() === streetName.toLowerCase() &&
      home.street_suffix.toLowerCase() === streetSuffix.toLowerCase()
    ) {
      homeArray.push(element);
    }
    if (
      work.street_name.toLowerCase() === streetName.toLowerCase() &&
      work.street_suffix.toLowerCase() === streetSuffix.toLowerCase()
    ) {
      workArray.push(element);
    }
  });
  let resultObj = homeArray.concat(workArray);
  resultObj = Array.from(new Set(resultObj.map((x) => x.id))).map((id) => {
    return resultObj.find((x) => x.id === id);
  });
  if (resultObj.length < 2) {
    throw `Error since there are not at least two people that live or work on ${streetName} ${streetSuffix}`;
  }
  return resultObj;
};

/**
 * For this function, you must convert all the SSN's to numbers (removing the dashes) then sort each person's SSN field from lowest to highest digit.
 * For example, a SSN of: "125-71-1069" would become the number 11125679.
 * Note: If the sorted SSN's first number(s) is/are  0, Javascript will drop the leading 0's. This is expected. The SSN of: "689-26-5619" would become: 125666899  you will then return an object that contains the person's name (first and last name) with the highest number, the person's name (first and last name) with the lowest number and the Math.floor of the average from all people:
 */
const manipulateSsn = async () => {
  let peopleObj = await getPeople();
  let ssnList = [];
  let maxSsn = -Infinity;
  let minSsn = +Infinity;
  let maxSnnObj = {};
  let minSnnObj = {};
  let sumSsn = 0;
  peopleObj.forEach((element) => {
    element.newSsn = element.ssn.replace(/-/g, "").split("").sort().join("");
    ssnList.push(parseInt(element.newSsn));
    sumSsn = sumSsn + parseInt(element.newSsn);
    if (parseInt(element.newSsn) > maxSsn) {
      maxSsn = element.newSsn;
      maxSnnObj = element;
    }
    if (parseInt(element.newSsn) < minSsn) {
      minSsn = element.newSsn;
      minSnnObj = element;
    }
  });
  let responseObj = {
    highest: { firstName: maxSnnObj.first_name, lastName: maxSnnObj.last_name },

    lowest: { firstName: minSnnObj.first_name, lastName: minSnnObj.last_name },

    average: Math.floor(sumSsn / ssnList.length),
  };
  return responseObj;
};

/**
 * This function will take in the month and day of a birthday: sameBirthday(09, 25)and it will return an array of strings with all the people who were born in that month, on that day.
 * You will show each person's first and last name as one string for each person as shown in the output below.
 */
const sameBirthday = async (month, day) => {
  month = makeTwoDigits(month);
  day = makeTwoDigits(day);
  checkIfArgumentIsPassed(month);
  checkIfArgumentIsPassed(day);
  checkIsProperNumber(month);
  checkIsProperNumber(day);
  checkIfMonthIsValid(month);
  checkIfDayIsValid(month, day);
  let peopleObj = await getPeople();
  let peopleList = [];
  peopleObj.forEach((element) => {
    element.newDateofBirth = element.date_of_birth.split("/");
    if (element.newDateofBirth.indexOf(month) === 0) {
      if (element.newDateofBirth.indexOf(day) === 1) {
        peopleList.push(`${element.first_name} ${element.last_name}`);
      }
    }
  });
  if (peopleList.length === 0) {
    throw `There are no people who have date of birth ${month}/${day}`;
  }
  return peopleList;
};

module.exports = {
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday,
  getPeople,
  checkIfArgumentIsPassed,
  checkIfInputIsString,
  checkIfIdParamterIsARealValue,
};
