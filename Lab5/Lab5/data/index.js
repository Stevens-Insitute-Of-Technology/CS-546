/**
 * This file bridges the files with business logic so that the routes folder can access the methods.
 */
const peopleData = require("./people");
const stocksData = require("./stocks");

module.exports = {
  people: peopleData,
  stocks: stocksData,
};
