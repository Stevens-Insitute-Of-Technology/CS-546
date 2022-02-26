const express = require("express");
const router = express.Router();
const data = require("../data");
const ObjectId = require("mongodb").ObjectID;

const restaurantsData = data.restaurants;

/**
 * Responds with an array of all restaurants in the format of
 * {"_id": "restaurant_id", "name": "restaurant_name"}
 * Note: Notice you are ONLY returning the restaurant ID as a string, and restaurant name
 */
router.get("/", async (req, res) => {
  try {
    let restaurants = await restaurantsData.getAll();
    if (restaurants.length === 0) {
      res.status(404).json({ error: "Restaurant(s) not found" });
    } else {
      res.json(restaurants);
    }
  } catch (e) {
    res.status(404).json({ error: "Restaurant(s) not found" });
  }
});

/**
 * Creates a restaurant with the supplied data in the request body, and returns the new restaurant
 * ALL FIELDS MUST BE PRESENT AND CORRECT TYPE.
 */
router.post("/", async (req, res) => {
  try {
    let data = req.body;
    const {
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      serviceOptions,
    } = data;
    try {
      restaurantsData.commonErrorHandling(
        data.name,
        data.location,
        data.phoneNumber,
        data.website,
        data.priceRange,
        data.cuisines,
        data.serviceOptions
      );
    } catch (error) {
      res.status(400).json({ error: error });
      return;
    }
    // if (!data.name) {
    //   res.status(400).json({ error: "You must provide name" });
    //   return;
    // }
    // if (typeof data.name !== "string") {
    //   res.status(400).json({ error: "Name must be of type string" });
    //   return;
    // }
    // if (!data.location) {
    //   res.status(400).json({ error: "You must provide location" });
    //   return;
    // }
    // if (typeof data.location !== "string") {
    //   res.status(400).json({ error: "Location must be of type string" });
    //   return;
    // }
    // if (!data.phoneNumber) {
    //   res.status(400).json({ error: "You must provide phoneNumber" });
    //   return;
    // }
    // if (typeof data.phoneNumber !== "string") {
    //   res.status(400).json({ error: "Phone Number must be of type string" });
    //   return;
    // }
    // if (!data.website) {
    //   res.status(400).json({ error: "You must provide website" });
    //   return;
    // }
    // if (typeof data.website !== "string") {
    //   res.status(400).json({ error: "Website must be of type string" });
    //   return;
    // }
    // if (!data.priceRange) {
    //   res.status(400).json({ error: "You must provide priceRange" });
    //   return;
    // }
    // if (typeof data.priceRange !== "string") {
    //   res.status(400).json({ error: "Price Range must be of type string" });
    //   return;
    // }
    // if (!data.cuisines) {
    //   res.status(400).json({ error: "You must provide cuisines" });
    //   return;
    // }
    // if (!Array.isArray(data.cuisines)) {
    //   res.status(400).json({ error: "Cuisine must be of type Array" });
    //   return;
    // }
    // if (!data.serviceOptions) {
    //   res.status(400).json({ error: "You must provide serviceOptions" });
    //   return;
    // }
    // if (typeof data.serviceOptions !== "object") {
    //   res.status(400).json({ error: "Service Options must be of type string" });
    //   return;
    // }
    // if (Array.isArray(data.serviceOptions)) {
    //   res.status(400).json({ error: "Service Options must be of type string" });
    //   return;
    // }
    let newRestaurant = await restaurantsData.create(
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      serviceOptions
    );
    res.json(newRestaurant);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

/**
 * Responds with the full content of the specified restaurant.
 * So you will return all details of the restaurant.
 * Your function should return the restaurant  _id as a string, not an object ID
 * If no restaurant with that _id is found, you will issue a 404 status code and end the request.
 * You will return the restaurant with a 200 status code along with the restaurant data if found.
 */
router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: "You must provide ID" });
      return;
    }
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "You must provide a valid ID" });
      return;
    }
    let restaurant = await restaurantsData.get(id);
    if (Object.keys(restaurant).length === 0) {
      res.status(404).json({ error: "Restaurant not found" });
    } else {
      res.json(restaurant);
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

/**
 * This request will update a restaurant with information provided from the PUT body.
 * Updates the specified restaurant by replacing the restaurant with the new restaurant content, and returns the updated restaurant.
 * All fields need to be supplied in the request.body, even if you are not updating all fields.
 */
router.put("/:id", async (req, res) => {
  try {
    let data = req.body;
    if (!req.params.id) throw "You must provide an id to search for";
    let id = req.params.id;
    if (!ObjectId.isValid(id)) throw "You must provide a valid id format";
    const {
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      serviceOptions,
    } = data;
    try {
      restaurantsData.commonErrorHandling(
        data.name,
        data.location,
        data.phoneNumber,
        data.website,
        data.priceRange,
        data.cuisines,
        data.serviceOptions
      );
    } catch (error) {
      res.status(400).json({ error: error });
      return;
    }
    let updatedRestaurant = await restaurantsData.update(
      id,
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      serviceOptions
    );
    res.json(updatedRestaurant);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: "You must provide ID" });
      return;
    }
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "You must provide a valid ID" });
      return;
    }
    let deletedResaurant = await restaurantsData.remove(id);
    res.json({ restaurantId: req.params.id, deleted: true });
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

module.exports = router;
