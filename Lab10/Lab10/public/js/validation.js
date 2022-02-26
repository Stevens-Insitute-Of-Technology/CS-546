function userNameValidation(username) {
  const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
  if (typeof username !== "string") {
    throw `Username is not of type string`;
  }
  if (username.trim() === "") {
    throw `Please enter a username`;
  }
  if (username.length < 4) {
    throw `Username must have 4 characters`;
  }
  if (!usernameRegex.test(username)) {
    throw `Please use valid username format`;
  }
}

function passwordValidation(password) {
  const passwordRegex = /^\S{6,}$/;
  if (!passwordRegex.test(password)) {
    throw `Either the username or password is invalid`;
  }
}

module.exports = {
  userNameValidation,
  passwordValidation,
};
