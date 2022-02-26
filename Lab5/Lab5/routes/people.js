/**
 * This is the route file where we define the api type like get or post.
 * Then we call the method whose business logic is written in data folder.
 */
const express = require("express");
const router = express.Router();
const data = require("../data");

const peopleData = data.people;

router.get("/", async (req, res) => {
  try {
    const peopleList = await peopleData.getAllPeople();
    res.json(peopleList);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const person = await peopleData.getPersonById(req.params.id);
    res.json(person);
  } catch (e) {
    res.status(404).json({ message: "Person not found" });
  }
});
module.exports = router;
