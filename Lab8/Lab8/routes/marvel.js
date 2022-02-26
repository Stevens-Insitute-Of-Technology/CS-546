const express = require("express");
const router = express.Router();
const data = require("../data");

const marvelData = data.marvel;

router.get("/", async (req, res) => {
  try {
    res.render("dataPage/searchTerm", { title: "Character Finder" });
  } catch (e) {
    res.status(400).render("dataPage/errors", { error: "Bad Request" });
  }
});

router.post("/search", async (req, res) => {
  try {
    let data = req.body;
    const { searchTerm } = data;
    try {
      if (!searchTerm) {
        throw `Please enter character to search`;
      }
      if (typeof searchTerm !== "string") {
        throw `Please string character`;
      }
      if (
        searchTerm &&
        typeof searchTerm === "string" &&
        searchTerm.trim() === ""
      ) {
        throw `Please enter character to search`;
      }
    } catch (error) {
      return res.status(400).render("dataPage/errors", {
        error: error,
      });
    }
    const searchTermData = await marvelData.searchTerm(searchTerm);
    res.render("dataPage/searchDataPage", {
      character: searchTermData.data.results.slice(0, 21),
      title: "Characters Found",
      searchTerm: searchTerm,
    });
  } catch (error) {
    res.status(400).render("dataPage/errors", { error: "Bad Request" });
  }
});

router.get("/characters/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      throw `Please enter id to search`;
    }
    let searchCharacterByIdData = await marvelData.searchCharacterById(
      req.params.id
    );
    let comicsNameArray = [];
    searchCharacterByIdData.data.results[0].comics.items.forEach((element) => {
      comicsNameArray.push(element.name);
    });
    let extension = "jpg";
    if (searchCharacterByIdData.data.results[0].thumbnail.extension) {
      extension = searchCharacterByIdData.data.results[0].thumbnail.extension;
    }
    res.render("dataPage/searchDataByIdPage", {
      result: searchCharacterByIdData.data.results[0],
      path:
        searchCharacterByIdData.data.results[0].thumbnail.path +
        "/portrait_xlarge." +
        extension,
      comics: comicsNameArray,
      title: searchCharacterByIdData.data.results[0].name,
    });
  } catch (error) {
    res.status(404).render("dataPage/errors", { error: "Bad Request" });
  }
});

module.exports = router;
