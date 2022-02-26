/**
 * This file contains business logic for the people data.
 * These method will be called inside route folder
 */
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

const getAllPeople = async () => {
  return await getPeople();
};

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

let exportedMethods = {
  getAllPeople,
  getPersonById,
  checkIfArgumentIsPassed,
  checkIfInputIsString,
  checkIfIdParamterIsARealValue,
};
module.exports = exportedMethods;
