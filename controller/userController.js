const { userModel } = require('../userModel');

const getUserByEmailIdAndPassword = async (email, password) => {
    let user = await userModel.findOne(email);
    if (user) {
        if (isUserValid(user, password)) {
            return user ?? null
        }
    }
};

//checks if user exists by id in database
const checkUserById = (id) => {
    let getUser = userModel.checkById(id)
    return getUser
}

const getUserById = async (id) => {
    let user = await userModel.findById(id);
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
