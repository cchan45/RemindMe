const { userModel } = require("../database");

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user ?? null
    }
  }
};

//checks if user exists by id in database
const checkUserById = (id) => {
  let user = userModel.checkById(id);
  if (user) 
    return true ?? false
}

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user ?? null
  }
}

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById, checkUserById
};
