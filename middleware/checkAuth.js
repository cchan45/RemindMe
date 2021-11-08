module.exports = {
    //checks if the user is authenticated (logged in)
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/login");
    },//checks if the user has a session currently running
    forwardAuthenticated: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect("/reminders");
    },
  };
  