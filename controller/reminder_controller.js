let database = require('../database');

let remindersController = {
    list: (req, res) => {
        res.render('reminder/index', {
            reminders: database.cindy.reminders
        });
    },

    new: (req, res) => {
        res.render('reminder/create');
    },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database.cindy.reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
            res.render('reminder/single-reminder', {
                reminderItem: searchResult
            });
        } else {
            res.render('reminder/index', {
                reminders: database.cindy.reminders
            });
        }
    },

    create: (req, res) => {
        let reminder = {
            id: database.cindy.reminders.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false,
        };
        database.cindy.reminders.push(reminder);
        res.redirect('/reminders');
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database.cindy.reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });
        res.render('reminder/edit', {
            reminderItem: searchResult
        });
    },

    update: (req, res) => {
        // Implement this code (Tadhg and Anthony)
    },

    delete: (req, res) => {
        let getParam = req.params.id;
        let searchResult = database.cindy.reminders.find(reminder => {
            return reminder.id == getParam
        })
        //deleting every element in the object that matches the id number in the parameter
        for (let item in searchResult) {
            delete searchResult[item]
        }
        // replacing the "reminders" array in database.js with the new fliter array to get rid of the empty object
        database.cindy.reminders = database.cindy.reminders.filter(
            reminder => !(Object.keys(reminder).length === 0)
        )
        // redirects back to the page with the new filtered array
        res.redirect('/reminders')
    },
};

module.exports = remindersController;
