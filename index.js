const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const session = require("express-session");
const reminderController = require('./controller/reminder_controller');
const authController = require('./controller/auth_controller')
const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const { ensureAuthenticated } = require("./middleware/checkAuth");

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

// Ensure user is logged in
app.get('/reminders', ensureAuthenticated, reminderController.list);
app.get('/reminder/new', ensureAuthenticated, reminderController.new);

//Registration Page
app.get('/register', authController.register)
app.post('/register', authController.registerSubmit)

/*routes below only work if the user is logged in 
(i.e. doesn't need "ensureAuthenticated" function inside these routes)
*/
app.get('/reminder/:id', reminderController.listOne);

app.get('/reminder/:id/edit', reminderController.edit);

app.post('/reminder/', reminderController.create);

app.post('/reminder/update/:id', reminderController.update);

app.post('/reminder/delete/:id', reminderController.delete);

//used for users logging in
app.use('/', authRoute);

app.listen(3001, function () {
    console.log(
        'Server running. Visit: http://localhost:3001/reminders in your browser 🚀'
    );
});
