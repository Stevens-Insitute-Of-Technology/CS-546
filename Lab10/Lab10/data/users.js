const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;
const valid = require("../public/js/validation");

const createUser = async (username, password) => {
  if (!username) {
    throw `Please provide username`;
  }
  if (!password) {
    throw `Please provide password`;
  }
  valid.userNameValidation(username);
  valid.passwordValidation(password);
  let userNameLowerCase = username.toLowerCase();
  const userCollection = await users();
  const user = await userCollection.findOne({ username: userNameLowerCase });
  if (user !== null) {
    throw `User Exists`;
  }
  password = await bcrypt.hash(password, saltRounds);
  let newUser = {
    username: userNameLowerCase,
    password,
  };
  if (user === null) {
    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw "Could not create account";
    return { userInserted: true };
  }
};

const checkUser = async (username, password) => {
  if (!username) {
    throw `Please provide username`;
  }
  if (!password) {
    throw `Please provide password`;
  }
  username = username.trim();
  valid.userNameValidation(username);
  valid.passwordValidation(password);
  const userCollection = await users();
  const userNameCheck = await userCollection.findOne({
    username: username.toLowerCase(),
  });
  if (userNameCheck === null) {
    throw `Either the username or password is invalid`;
  } else {
    const passwordCompare = await bcrypt.compare(
      password,
      userNameCheck.password
    );
    if (passwordCompare) {
      return { authenticated: true };
    } else {
      throw `Either the username or password is invalid`;
    }
  }
};

module.exports = {
  createUser,
  checkUser,
};
