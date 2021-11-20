let {userModel} = require('../database');
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

let authController = {
    login: (req, res) => {
        res.render('auth/login');
    },

    register: (req, res) => {
        res.render('auth/register');
    },

    registerSubmit: async (req, res) => {
        //checks if the email exists in the database already
        const {email, name, password} = req.body
        const existingUser = await prisma.user.findUnique({where: {email}})
        if (existingUser) {
            res.send(`${email} already exists in the database`)
        }
        const createUser = await prisma.user.create({
            data: {
                "name": name,
                "email": email,
                "password": password,
                admin: false,
                profile_picture: "",
            },
        })
    },

    //creates db entry for github logins
    githubRegister: (user) => {
        Database.push(
            {
                'id': parseInt(user.id),
                'name': user.username,
                'admin': false,
                'reminders': []
            }
        )
    }
};

module.exports = authController;
