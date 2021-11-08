const { userModel } = require("../database");

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user ?? null
    }
  }
};

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
  getUserById,
};
