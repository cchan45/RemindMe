//Database Stuff
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

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

//creates a user into the database (hard coded data rn, have to make it dynamic cause of register function)
async function createCindy() {

    const newUser = await prisma.user.create({
        data: {
            name: 'cindy',
            email: 'cindy@gmail.com',
            password: 'cindy123',
            admin: true,
            profile_picture: 'https://images.unsplash.com/photo-1634883966638-ba2c79927cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzU5Mjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzcwNDMxNDg&ixlib=rb-1.2.1&q=80&w=400',
        },
    });

    const newReminder = await prisma.reminder.create({
        data: {
            title: 'abc',
            description: 'This is a random description!',
            completed: false,
            userId: newUser.id,
        },
    });

    const newUserWithReminders = await prisma.user.findUnique({
        where: {
            email: 'cindy@gmail.com',
        },
        include: {reminders: true},
    });
}

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

createCindy()
    .catch((err) => {
        console.log(err)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

app.listen(3001, function () {
    console.log(
        'Server running. Visit: http://localhost:3001/reminders in your browser 🚀'
    );
});
