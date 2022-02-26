const restaurant = require("./data/restaurants");
const connection = require("./config/mongoConnection");

const main = async () => {
  try {
    const newRestaurant1 = await restaurant.create(
      "The Saffron Lounge",
      "New York City, New York",
      "123-456-7890",
      "http://www.saffronlounge.com",
      "$$$$",
      ["Cuban", "Italian"],
      3,
      { dineIn: true, takeOut: true, delivery: false }
    );
    console.log(newRestaurant1);
    const newRestaurant2 = await restaurant.create(
      "Amanda's",
      "Hoboken, New Jersey",
      "201-798-0101",
      "http://www.amandasrestaurant.com",
      "$$",
      ["American", "Argentine"],
      4,
      { dineIn: true, takeOut: true, delivery: false }
    );
    const all = await restaurant.getAll();
    console.log(all);
    const newRestaurant3 = await restaurant.create(
      "Karma Kafe",
      "Hoboken, New Jersey",
      "201-610-0900",
      "http://www.karmakafe.com",
      "$$",
      ["Indian"],
      4,
      { dineIn: true, takeOut: true, delivery: true }
    );
    console.log(newRestaurant3);
    const restaurant1Update = await restaurant.rename(
      newRestaurant1._id,
      "http://www.saffronloungenyc.com"
    );
    console.log(restaurant1Update);
    const removeSecondRestaurant = await restaurant.remove(newRestaurant2._id);
    console.log(removeSecondRestaurant);
    const allUpdated = await restaurant.getAll();
    console.log(allUpdated);
    try {
      const newRestaurant4 = await restaurant.create(
        "Panera Bread",
        "Hoboken, New Jersey",
        "(201) 876-3233",
        "https://locations.panerabread.com/nj/hoboken/310-washington-st.html?utm_medium=yext&utm_source=local&utm_campaign=yext&utm_content=local-search",
        "$$",
        ["Bakery, Salad"],
        4,
        { dineIn: "no", takeOut: true, delivery: true }
      );
    } catch (error) {
      console.log(error);
    }
    try {
      await restaurant.remove("507f1f77bcf86cd799439011");
    } catch (error) {
      console.log(error);
    }
    try {
      await restaurant.rename(
        "507f1f77bcf86cd799439011",
        "http://www.wrongInputMethodCheck.com"
      );
    } catch (error) {
      console.log(error);
    }
    try {
      await restaurant.rename(
        newRestaurant1._id,
        "https://www.wrongWebsiteAddressCheck.com"
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const getIdError = await restaurant.get(newRestaurant2._id);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }

  const db = await connection();
  await db.serverConfig.close();
};

main().catch((error) => {
  console.log(error);
});
