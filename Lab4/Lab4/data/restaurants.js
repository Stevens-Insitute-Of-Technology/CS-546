const mongoCollections = require("../config/mongoCollections");
const ObjectId = require("mongodb").ObjectID;
const restaurants = mongoCollections.restaurants;

function checkIfArgumentIsPassed(val) {
  if (typeof val === "undefined") {
    throw `Please pass an input.`;
  }
}
function checkIfInputIsString(val) {
  if (typeof val === "string") {
    val = val.trim();
    if (val === "") {
      throw `Empty strings is not a valid argument.`;
    }
    return val.trim();
  } else if (typeof val !== "string") {
    throw `${val} is not a string. Please pass a string`;
  }
}

function checkPhoneFormat(phone) {
  const pRe = /^\d{3}-\d{3}-\d{4}$/;
  if (!pRe.test(phone)) {
    throw `Please pass a valid phone number.`;
  }
}

function checkWebsiteFormat(website) {
  website = website.trim().toLowerCase();
  if (!website.startsWith("http://www.")) {
    throw `Please pass a valid website address.`;
  }
  if (!website.endsWith(".com")) {
    throw `Please pass a valid website address.`;
  }
  if (website.length < 20) {
    throw `Please pass a valid website address.`;
  }
}

function checkPriceRangeFormat(priceRange) {
  const priceRangeRegex = /^[\$]{1,4}$/;
  if (!priceRangeRegex.test(priceRange)) {
    throw `Please pass a valid price range format.`;
  }
}

function checkCuisines(cuisines) {
  if (!Array.isArray(cuisines)) {
    throw `Cuisines should be of type array.`;
  }
  if (Array.isArray(cuisines)) {
    if (cuisines.length === 0) {
      throw `Please insert a type(s) of cuisines`;
    }
    if (cuisines.length >= 1) {
      cuisines.forEach((element) => {
        checkIfInputIsString(element);
      });
    }
  }
}

function checkServiceOptions(serviceOptions) {
  if (typeof serviceOptions !== "object") {
    throw `Please pass an object.`;
  }
  if (Array.isArray(serviceOptions)) {
    throw `Please pass an object.`;
  }
  if (serviceOptions.dineIn && typeof serviceOptions.dineIn !== "boolean") {
    throw `Please pass boolean value.`;
  }
  if (serviceOptions.takeOut && typeof serviceOptions.takeOut !== "boolean") {
    throw `Please pass boolean value.`;
  }
  if (serviceOptions.delivery && typeof serviceOptions.delivery !== "boolean") {
    throw `Please pass boolean value.`;
  }
}

function checkOverallRating(overallRating) {
  if (typeof overallRating !== "number") {
    throw `Please rate using number`;
  }
  if (overallRating < 0 || overallRating > 5) {
    throw `Please rate betweeen 0 and 5`;
  }
}

const convertStringToObject = (id) => {
  if (typeof id === "string" && ObjectId.isValid(id)) {
    id = id.trim();
    id = new ObjectId(id);
  } else if (typeof id === "object") {
    return id;
  }
  return id;
};

const create = async (
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  overallRating,
  serviceOptions
) => {
  checkIfArgumentIsPassed(name);
  checkIfArgumentIsPassed(location);
  checkIfArgumentIsPassed(phoneNumber);
  checkIfArgumentIsPassed(priceRange);
  checkIfArgumentIsPassed(cuisines);
  checkIfArgumentIsPassed(overallRating);
  checkIfArgumentIsPassed(serviceOptions);
  name = checkIfInputIsString(name);
  location = checkIfInputIsString(location);
  phoneNumber = checkIfInputIsString(phoneNumber);
  website = checkIfInputIsString(website);
  priceRange = checkIfInputIsString(priceRange);
  checkPhoneFormat(phoneNumber);
  checkWebsiteFormat(website);
  checkPriceRangeFormat(priceRange);
  checkCuisines(cuisines);
  checkServiceOptions(serviceOptions);
  checkOverallRating(overallRating);

  let newRestaurant = {
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating,
    serviceOptions,
  };
  const restaurantCollection = await restaurants();
  const insertInfo = await restaurantCollection.insertOne(newRestaurant);
  if (insertInfo.insertedCount === 0) throw "Could not add Restaurant";

  const newId = insertInfo.insertedId;

  const restaurant = await get(newId);
  return restaurant;
};

const getAll = async () => {
  const restaurantCollection = await restaurants();

  let restaurantList = await restaurantCollection.find({}).toArray();
  restaurantList.forEach((element) => {
    element._id = ObjectId(element._id).toString();
  });
  return restaurantList;
};

const get = async (id) => {
  if (!id) throw "You must provide an id to search for";
  if (!ObjectId.isValid(id)) throw "You must provide a valid id format";
  id = convertStringToObject(id);
  const restaurantCollection = await restaurants();
  const restaurant = await restaurantCollection.findOne({ _id: id });
  if (restaurant === null) throw "No Restaurant with that id";
  restaurant._id = ObjectId(restaurant._id).toString();
  return restaurant;
};

const remove = async (id) => {
  if (!id) throw "You must provide an id to search for";
  if (!ObjectId.isValid(id)) throw "You must provide a valid id format";
  id = convertStringToObject(id);
  const restaurantCollection = await restaurants();
  const deleteRestaurantDetails = await get(id);
  const deletionInfo = await restaurantCollection.deleteOne({ _id: id });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete restaurant with id of ${id}`;
  }
  const result = `${deleteRestaurantDetails.name} has been successfully deleted!`;
  return result;
};

const rename = async (id, newWebsite) => {
  const restaurantCollection = await restaurants();
  if (!id) throw "You must provide an id to search for";
  if (!newWebsite) throw "You must provide updated website";
  if (!ObjectId.isValid(id)) throw "You must provide a valid id format";
  id = convertStringToObject(id);
  if (typeof newWebsite !== "string") throw "website must be of type string";
  checkWebsiteFormat(newWebsite);
  const restaurant = await get(id);
  if (restaurant.website === newWebsite) throw "There is no change in website.";
  let updatedRestaurant = {
    name: restaurant.name,
    location: restaurant.location,
    phoneNumber: restaurant.phoneNumber,
    website: newWebsite,
    priceRange: restaurant.priceRange,
    cuisines: restaurant.cuisines,
    overallRating: restaurant.overallRating,
    serviceOptions: restaurant.serviceOptions,
  };
  const updatedInfo = await restaurantCollection.updateOne(
    { _id: id },
    { $set: updatedRestaurant }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update restaurant website successfully";
  }
  return await get(id);
};

module.exports = {
  create,
  getAll,
  get,
  remove,
  rename,
};
