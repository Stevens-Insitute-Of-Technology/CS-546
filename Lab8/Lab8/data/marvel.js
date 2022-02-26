const axios = require("axios");
const md5 = require("blueimp-md5");
const publickey = "26880540a6e491e18699ace5ba44aa2d";
const privatekey = "0d4acef2582f511ef0fd56e60222a03b079e81f0";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

async function getData() {
  const { data } = await axios.get(url);
  return data;
}

async function searchTerm(searchTerm) {
  if (!searchTerm || searchTerm.trim() === "") {
    throw `Please enter character to search`;
  }
  let searchTermUrl =
    baseUrl +
    "?nameStartsWith=" +
    searchTerm +
    "&limit=20" +
    "&ts=" +
    ts +
    "&apikey=" +
    publickey +
    "&hash=" +
    hash;
  const { data } = await axios.get(searchTermUrl);
  return data;
}

async function searchCharacterById(id) {
  if (!id) throw "You must provide a id to search for";
  let searchByIdUrl =
    baseUrl + "/" + id + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
  const { data } = await axios.get(searchByIdUrl);
  return data;
}

let exportedMethods = {
  getData,
  searchTerm,
  searchCharacterById,
};
module.exports = exportedMethods;
