const express = require("express");
const passport = require("../middleware/passport");
const router = express.Router();
let database = require('../database');

let authController = {
    login: (req, res) => {
        res.render('auth/login');
    },

    register: (req, res) => {
        res.render('auth/register');
    },

    loginSubmit: (req, res) => {
        router.post(
            "/login",
            passport.authenticate("local", {
              successRedirect: "/dashboard",
              failureRedirect: "/login",
            })
          );
    },

    registerSubmit: (req, res) => {
        // implement
    },
};

module.exports = authController;
