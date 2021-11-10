let { Database, userModel }= require('../database');

let authController = {
    login: (req, res) => {
        res.render('auth/login');
    },

    register: (req, res) => {
        res.render('auth/register');
    },

    registerSubmit: (req, res) => {
        for (let user in Database) { //checks if the email exists in the database already
            for (const  [key, value] of Object.entries(Database[user])) {
                if (req.body.email === value) {
                    return res.send(`${req.body.email} already exists in the database`)
                }
            }
        }
        Database.push({
            "id": Database.length + 1,
            "name": req.body["name"],
            "email": req.body["email"],
            "password": req.body["password"],
            "reminders": []
        })
        console.log(Database)
        const user = userModel.findOne(req.body["email"])
        req.login(user, (err) => {
            if (err){
                res.send(err)
            } else {
                res.redirect("/reminders")
            }
        })
    },
    //creates db entry for github logins
    githubRegister: (req, res) => {
        Database.push(
            {
                "id": parseInt(req.id),
                "name": req.username,
                "reminders": []
            }
        )
    }
};

module.exports = authController;
