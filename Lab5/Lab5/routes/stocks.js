/**
 * This is the route file where we define the api type like get or post.
 * Then we call the method whose business logic is written in data folder.
 */
const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get("/", async (req, res) => {
  try {
    const stocksList = await stocksData.getAllStocks();
    res.json(stocksList);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const stock = await stocksData.getStocksById(req.params.id);
    res.json(stock);
  } catch (e) {
    res.status(404).json({ message: "Stock not found" });
  }
});
module.exports = router;
