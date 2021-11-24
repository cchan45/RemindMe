const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const userController = require('../controller/userController');
const authController = require('../controller/authController')
require('dotenv').config()

const localLogin = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
        const user = userController.getUserByEmailIdAndPassword(email, password)
        // console.log(user)
        return user
            // 'done' function calls serializeUser to create a session
            ? done(null, user)
            : done(null, false, {
                message: 'Your login details are not valid. Please try again',
            });
    }
);

const githubLogin = new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_HOST,
        scope: ['user:email'],
    },
    async (accessToken, refreshToken, user, done) => {
    const checkUser = await userController.checkUserById(parseInt(user.id))
            if (checkUser) {
                return done(null, checkUser);
            } else {
                const makeUser = authController.githubRegister(user);
                return done(null, makeUser);
            }
    });

//creates a session if user is in database (only if user is logged in)
passport.serializeUser(async function (user, done) {
    const getUser = await user
    done(null, parseInt(getUser.id)); // stores the userID inside the session
});  //changed ^ to parseInt for github

passport.deserializeUser(function (id, done) {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({message: 'User not found'}, null);
    }
});

module.exports = passport.use(localLogin), passport.use(githubLogin);
