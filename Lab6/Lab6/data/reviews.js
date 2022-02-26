const mongoCollections = require("../config/mongoCollections");
const ObjectId = require("mongodb").ObjectID;
const restaurantData = require("./restaurants");
const restaurants = mongoCollections.restaurants;

function checkIfArgumentIsPassed(val) {
  if (typeof val === "undefined") {
    throw `Please pass an input.`;
  }
}

// Method to check if the values passed is a number or not
function checkIsProperNumber(val) {
  if (typeof val !== "number") {
    throw `${val} is not a number`;
  }

  if (isNaN(val)) {
    throw `${val} is NaN`;
  }
}

const empty = (data) => {
  if (typeof data === "number" || typeof data === "boolean") {
    return false;
  }
  if (typeof data === "undefined" || data === null) {
    return true;
  }
  if (typeof data.length !== "undefined") {
    return data.length === 0;
  }
  for (let i in data) {
    if (data.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
};

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

function checkRatingRangeFormat(rating) {
  checkIsProperNumber(rating);
  const ratingRegex = /^[1-5]{1}$/;
  if (!ratingRegex.test(rating)) {
    throw `Please pass a valid rating.`;
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

const checkDateValidation = (dateOfReview) => {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear().toString();
  dateOfReview = dateOfReview.split("/");
  if (dateOfReview[0] !== month) {
    throw `${dateOfReview[0]} is not a valid month`;
  }
  if (dateOfReview[1] !== date) {
    throw `${dateOfReview[1]} is not a valid date`;
  }
  if (dateOfReview[2] !== year) {
    throw `${dateOfReview[2]} is not a valid year`;
  }
};

function commonErrorHandling(
  restaurantId,
  title,
  reviewer,
  rating,
  dateOfReview,
  review
) {
  checkIfArgumentIsPassed(restaurantId);
  checkIfArgumentIsPassed(title);
  checkIfArgumentIsPassed(reviewer);
  checkIfArgumentIsPassed(rating);
  checkIfArgumentIsPassed(dateOfReview);
  checkIfArgumentIsPassed(review);
  restaurantId = checkIfInputIsString(restaurantId);
  title = checkIfInputIsString(title);
  reviewer = checkIfInputIsString(reviewer);
  dateOfReview = checkIfInputIsString(dateOfReview);
  review = checkIfInputIsString(review);
  checkRatingRangeFormat(rating);
  checkDateValidation(dateOfReview);
}

const create = async (
  restaurantId,
  title,
  reviewer,
  rating,
  dateOfReview,
  review
) => {
  commonErrorHandling(
    restaurantId,
    title,
    reviewer,
    rating,
    dateOfReview,
    review
  );
  if (!ObjectId.isValid(restaurantId))
    throw "You must provide a valid id format";
  restaurantId = convertStringToObject(restaurantId);
  let restaurantById = await restaurantData.get(restaurantId);
  if (restaurantById === null) throw "No Restaurant with that id";
  let newReview = {
    _id: ObjectId(),
    title,
    reviewer,
    rating,
    dateOfReview,
    review,
  };
  restaurantById.reviews.push(newReview);
  let newOverallRating =
    restaurantById.overallRating +
    (newReview.rating - restaurantById.overallRating) /
      restaurantById.reviews.length;
  const restaurantCollection = await restaurants();
  let reviewDataAdded = await restaurantCollection.updateOne(
    { _id: restaurantId },
    {
      $set: {
        overallRating: newOverallRating,
        reviews: restaurantById.reviews,
      },
    }
  );
  if (
    reviewDataAdded.matchedCount !== 1 &&
    reviewDataAdded.modifiedCount !== 1
  ) {
    throw `Error! Review not added.`;
  } else {
    let review = await restaurantData.get(ObjectId(restaurantId).toString());
    return review;
  }
};

const getAll = async (restaurantId) => {
  checkIfArgumentIsPassed(restaurantId);
  restaurantId = checkIfInputIsString(restaurantId);
  if (!ObjectId.isValid(restaurantId))
    throw "You must provide a valid id format";
  restaurantId = convertStringToObject(restaurantId);
  let restaurantById = await restaurantData.get(restaurantId);
  if (restaurantById === null) throw "No Restaurant with that id";
  restaurantById.reviews.forEach((element) => {
    element.restaurantId = ObjectId(restaurantId).toString();
  });
  return restaurantById.reviews;
};

const get = async (reviewId) => {
  checkIfArgumentIsPassed(reviewId);
  reviewId = checkIfInputIsString(reviewId);
  if (!ObjectId.isValid(reviewId)) throw "You must provide a valid id format";
  reviewId = convertStringToObject(reviewId);
  const restaurantCollection = await restaurants();
  let review = await restaurantCollection
    .aggregate([
      { $match: { "reviews._id": reviewId } },
      { $unwind: "$reviews" },
      { $match: { "reviews._id": reviewId } },
      { $project: { _id: 0, reviews: 1 } },
    ])
    .toArray();

  let response = {};

  try {
    response = review[0].reviews;
  } catch (err) {}
  return response;
};

const remove = async (reviewId) => {
  checkIfArgumentIsPassed(reviewId);
  let reviewExists = await get(reviewId);
  if (empty(reviewExists)) {
    throw "Review not found";
  }
  reviewId = checkIfInputIsString(reviewId);
  if (!ObjectId.isValid(reviewId)) throw "You must provide a valid id format";
  reviewId = convertStringToObject(reviewId);

  const restaurantCollection = await restaurants();
  // let restaurant = await restaurantCollection
  //   .find({ reviews: { $elemMatch: { _id: ObjectId(reviewId).toString() } } })
  //   .toArray();
  let restaurant = await restaurantCollection
    .aggregate([{ $match: { "reviews._id": reviewId } }])
    .toArray();
  let remove = await restaurantCollection.findOneAndUpdate(
    { _id: restaurant[0]._id },
    { $pull: { reviews: { _id: reviewId }, multi: true } }
  );
  if (remove.ok === 1) {
    let newOverallRating = 0;
    if (remove.value.reviews.length > 0) {
      let totalOverallRating =
        remove.value.overallRating * remove.value.reviews.length;
      let lengthAfterDelete = remove.value.reviews.length - 1;
      newOverallRating =
        (totalOverallRating - reviewExists.rating) / lengthAfterDelete;
    }
    if (isNaN(newOverallRating)) {
      newOverallRating = 0;
    }
    const restaurantCollection = await restaurants();
    restaurantCollection.updateOne(
      { _id: remove.value._id },
      {
        $set: {
          overallRating: newOverallRating,
        },
      }
    );
  }

  return remove;
};
module.exports = {
  create,
  getAll,
  get,
  remove,
  commonErrorHandling,
};
