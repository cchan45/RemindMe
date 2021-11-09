const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const session = require("express-session");
const passport = require("./middleware/passport");
const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoute");
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(ejsLayouts);


app.use(passport.initialize());

app.use(passport.session());

//sub-routes
app.use('/', indexRoute)
app.use('/auth', authRoute);

app.listen(3001, function () {
    console.log(
        'Server running. Visit: http://localhost:3001/reminders in your browser 🚀'
    );
});
