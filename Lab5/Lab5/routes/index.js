/**
 * This file bridges the routes written in people.js and stocks.js file
 */
const peopleRoutes = require("./people");
const stocksRoutes = require("./stocks");

const constructorMethod = (app) => {
  app.use("/people", peopleRoutes); // when searched with people parameter
  app.use("/stocks", stocksRoutes); // when searched with stocks parameter

  app.use("*", (req, res) => {
    res
      .status(404)
      .json({
        stocks: "http://localhost:3000/stocks",
        people: "http://localhost:3000/people",
      });
  });
};

module.exports = constructorMethod;
