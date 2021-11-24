let {userModel} = require('../userModel');
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

require('dotenv').config();
const axios = require('axios').default;

const getProfilePic = () => {
    return new Promise((resolve, reject) => {
        let URL = ''
        axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS}`)
            .then(response => {
                URL = response.data.urls.small
                resolve(URL)
            })
            .catch((err) => console.log(err));
    })
}

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
        //adds the user to the database
        const getURL = await getProfilePic()
        const createUser = await prisma.user.create({
            data: {
                'name': name,
                'email': email,
                'password': password,
                'admin': false,
                'profile_picture': getURL,
            },
        })
        const getUser = await userModel.findOne(email)
        req.login(getUser, (err) => {
            if (err) {
                res.send(err)
            }
            res.redirect('/reminders')
        })
    },

    //creates db entry for github logins
    githubRegister: async (githubUser) => {
        const getURL = await getProfilePic()
        const createUser = await prisma.user.create({
            data: {
                'id': parseInt(githubUser.id),
                'name': githubUser.username,
                'email': githubUser.emails[0].value,
                'password': '',
                'admin': false,
                'profile_picture': getURL,
            }
        })
        return createUser
    }
};

module.exports = authController;
