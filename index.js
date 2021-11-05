const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const session = require("express-session");
const reminderController = require('./controller/reminder_controller');
const passport = require("./middleware/passport");
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

// Routes start here

app.get('/reminders', reminderController.list);

app.get('/reminder/new', reminderController.new);

app.get('/reminder/:id', reminderController.listOne);

app.get('/reminder/:id/edit', reminderController.edit);

app.post('/reminder/', reminderController.create);

// Implement this yourself
app.post('/reminder/update/:id', reminderController.update);

// Implement this yourself
app.post('/reminder/delete/:id', reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.use('/auth', authRoute);

app.listen(3001, function () {
    console.log(
        'Server running. Visit: http://localhost:3001/reminders in your browser 🚀'
    );
});
