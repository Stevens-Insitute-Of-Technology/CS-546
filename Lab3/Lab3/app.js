const pepole = require("./people");
const stocks = require("./stocks");

async function main() {
  try {
    console.log("getPersonById Method test call");
    console.log(
      await pepole.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10")
    );
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("sameStreet Method test call");
    console.log(await pepole.sameStreet("SuthErland", "Point"));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("manipulateSsn Method test call");
    console.log(await pepole.manipulateSsn());
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("sameBirthday Method test call");
    console.log(await pepole.sameBirthday("012", "08"));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("listShareholders Method test call");
    console.dir(await stocks.listShareholders(), { depth: null });
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("topShareholder Method test call");
    console.log(await stocks.topShareholder("Cathay General Bancorp"));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("listStocks Method test call");
    console.log(await stocks.listStocks("Grenville    ", "Pawelke"));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("getStockById Method test call");
    console.log(
      await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0")
    );
  } catch (error) {
    console.log(error);
  }
}

main();
