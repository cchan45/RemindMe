let { Database }= require('../database');

let authController = {
    login: (req, res) => {
        res.render('auth/login');
    },

    register: (req, res) => {
        res.render('auth/register');
    },

    loginSubmit: (req, res) => {
        // implement
    },

    registerSubmit: (req, res) => {
        Database.push({
            "id": Database.length + 1,
            "name": req.body["name"],
            "email": req.body["email"],
            "password": req.body["password"],
            "reminders": []
        })
        console.log(Database)
        res.redirect("/reminders")
    }
};

module.exports = authController;
