module.exports = {
    //checks if the user is authenticated (logged in)
    ensureAuthenticated: (req, res, next) => {
        return req.isAuthenticated()
            ? next()
            : res.redirect('/auth/login');
    },
    //checks if the user has a session currently running (is logged in)
    forwardAuthenticated: (req, res, next) => {
        return !req.isAuthenticated()
            ? next()
            : res.redirect('/reminders');
    },
    // checks if the user is an admin
    ensureAdmin: (req, res, next) => {
        return req.user.admin
            ? next()
            : res.redirect('/reminders');
    }
};
