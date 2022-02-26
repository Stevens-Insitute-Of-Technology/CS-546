const axios = require("axios");
const people = require("./people");

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data;
}

/**
 * For this function, you will return an array of objects of all the stocks.
 * You will list all the stocks from  stocks.json, but instead of displaying the userid's of the shareholders, you will look up that userid  in  people.json and return that user's first name and last name in the return object instead:
 * Note: If a stock has no shareholders, you will return an empty array.
 */
const listShareholders = async (a) => {
  if (typeof a !== "undefined") {
    throw `Please remove the argument`;
  }
  const stocksObj = await getStocks();
  const peopleObj = await people.getPeople();
  let peopleDetails;
  stocksObj.forEach((element) => {
    element.shareholders.forEach((s) => {
      peopleDetails = peopleObj.find((x) => x.id === s.userId);
      s.first_name = peopleDetails.first_name;
      s.last_name = peopleDetails.last_name;
      delete s.userId;
    });
  });
  return stocksObj;
};

/**
 * Given the stockName provided, you will find the company from stocks.json  and will return the name of the shareholder from people.json that has the most shares and the number of shares they own.
 */
const topShareholder = async (stockName) => {
  people.checkIfArgumentIsPassed(stockName);
  people.checkIfInputIsString(stockName);
  people.checkIfIdParamterIsARealValue(stockName);
  stockName = stockName.trim();
  const stocksObj = await getStocks();
  const peopleObj = await people.getPeople();
  let stockDetails;
  let resMessage = "";
  let maxShares = -Infinity;
  let maxShareHolderFirstName = "";
  let maxShareHolderLastName = "";
  for (const element of stocksObj) {
    if (element.stock_name === stockName) {
      if (element.shareholders.length === 0) {
        resMessage = element.stock_name + " currently has no shareholders.";
        break;
      } else {
        stockDetails = element.shareholders;
        stockDetails.forEach((element) => {
          if (element.number_of_shares > maxShares) {
            maxShares = element.number_of_shares;
            let person = peopleObj.find((x) => x.id === element.userId);
            maxShareHolderFirstName = person.first_name;
            maxShareHolderLastName = person.last_name;
          }
        });
        resMessage = `With ${maxShares} shares in ${stockName}, ${maxShareHolderFirstName} ${maxShareHolderLastName} is the top shareholder.`;
        break;
      }
    }
  }
  if (resMessage === "") {
    throw `No stock with that name`;
  }
  return resMessage;
};

/**
 * Given a firstName and lastName, find the person in the people.json array, then, if they are found, get their ID and find out how many company stocks they own and the number of shares for each from  stocks.json
 * You will return an array of objects with the stock name and the number of shares they own in each company.
 */
const listStocks = async (firstName, lastName) => {
  people.checkIfArgumentIsPassed(firstName);
  people.checkIfInputIsString(firstName);
  people.checkIfIdParamterIsARealValue(firstName);
  people.checkIfArgumentIsPassed(lastName);
  people.checkIfInputIsString(lastName);
  people.checkIfIdParamterIsARealValue(lastName);
  firstName = firstName.trim();
  lastName = lastName.trim();

  const stocksObj = await getStocks();
  const peopleObj = await people.getPeople();
  let person = {};
  let stockDetailsArray = [];
  let flag = true;
  for (let index = 0; index < peopleObj.length; index++) {
    if (flag) {
      if (
        peopleObj[index].first_name === firstName &&
        peopleObj[index].last_name === lastName
      ) {
        person = peopleObj[index];
        index = 0;
        flag = false;
      }
      if (index === peopleObj.length - 1 && Object.keys(person).length == 0) {
        throw `${firstName} ${lastName} is not a user.`;
      }
    }
    if (!flag) {
      stocksObj[index].shareholders.forEach((element) => {
        if (element.userId === person.id) {
          let stockDetails = {};
          stockDetails.number_of_shares = element.number_of_shares;
          stockDetails.stock_name = stocksObj[index].stock_name;
          stockDetailsArray.push(stockDetails);
        }
      });
    }
  }
  if (stockDetailsArray.length === 0) {
    throw `${firstName} ${lastName} does not own any stocks.`;
  }
  return stockDetailsArray;
};

/**
 * This will return the Stock for the specified id within the stocks.json array.
 * Note: The id is case sensitive.
 */
const getStockById = async (id) => {
  people.checkIfArgumentIsPassed(id);
  people.checkIfInputIsString(id);
  people.checkIfIdParamterIsARealValue(id);
  id = id.trim();
  const stocksObj = await getStocks();
  let stock = stocksObj.find((x) => x.id === id);
  if (typeof stock === "undefined") {
    throw `Stock not found`;
  }
  if (Object.keys(stock).length > 0) {
    return stock;
  }
};

module.exports = {
  listShareholders,
  topShareholder,
  listStocks,
  getStockById,
};
