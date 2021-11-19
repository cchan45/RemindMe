const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./middleware/passport');
const indexRoute = require('./routes/indexRoute');
const authRoute = require('./routes/authRoute');
const passUser = require('./middleware/passUser');
const imgur = require('imgur');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        callback(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({
    storage: storage,
});

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); //building a dynamic path to the 'public' folder

app.use(express.urlencoded({
    extended: false
}));

app.use(
    session({
        secret: 'secret',
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

app.use(passUser);

app.use(upload.any());

//used for users logging in
app.use('/', indexRoute)
app.use('/auth', authRoute);

app.post('/uploads/', async (req, res) => {
    const file = req.files[0];
    try {
        const url = await imgur.uploadFile(`./uploads/${file.filename}`);
        fs.unlinkSync(`./uploads/${file.filename}`);
        res.locals.user.profile_picture = url.link;
        // this line is needed so the page reloads
        res.json();
    } catch (error) {
        console.log('error', error);
    }
});

app.listen(3001, function () {
    console.log(
        'Server running. Visit: http://localhost:3001/reminders in your browser 🚀'
    );
});
