/**
 * This file contains business logic for the stocks data.
 * These method will be called inside route folder
 */
const axios = require("axios");
const people = require("./people");

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data;
}

const getAllStocks = async () => {
  return await getStocks();
};

const getStocksById = async (idNumber) => {
  people.checkIfArgumentIsPassed(idNumber);
  people.checkIfInputIsString(idNumber);
  people.checkIfIdParamterIsARealValue(idNumber);
  idNumber = idNumber.trim();
  let stocksObj = await getStocks();
  let resultObj = stocksObj.find((x) => x.id === idNumber);
  if (typeof resultObj === "undefined") {
    throw `Stock not found`;
  }
  if (Object.keys(resultObj).length > 0) {
    return resultObj;
  }
};

let exportedMethods = {
  getAllStocks,
  getStocksById,
};
module.exports = exportedMethods;
