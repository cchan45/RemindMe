const express = require("express");
const authController = require('../controller/authController')
const passport = require("../middleware/passport");
const {forwardAuthenticated} = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/reminders",
        failureRedirect: "/auth/login",
    }),
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
});

//Registration Page
router.get("/register", authController.register)
router.post("/register", authController.registerSubmit)

//github login route
router.get('/github',
    passport.authenticate('github', {scope: ['user:email']}));

router.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/auth/login'}),
    function (req, res) {
        // Successful authentication, redirect to dashboard.
        res.render('dashboard', {user: req.user});
    }
);


router.use(passport.initialize())

module.exports = router;
