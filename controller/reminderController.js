const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

let remindersController = {
    list: async (req, res) => {
        let getUser = await req.user
        res.render('reminder/index', {
            reminders: getUser.reminders
        });
    },

    new: (req, res) => {
        res.render('reminder/create');
    },

    listOne: async(req, res) => {
        let reminderToFind = req.params.id;
        let getUser = await req.user
        let searchResult = getUser.reminders.find(reminder => reminder.id == reminderToFind)
        if (searchResult !== undefined) {
            res.render('reminder/single-reminder', {
                reminderItem: searchResult
            })
        } else {
            res.render('reminder/index', {
                reminders: getUser.reminders
            })
        }
    },

    create: async(req, res) => {
        const {title, description} = req.body
        let user = await req.user
        const newReminder = await prisma.reminder.create({
            data: {
                'title': title,
                'description': description,
                'completed': false,
                'userId': user.id,
            },
        })
        res.redirect('/reminders')
    },

    edit: async(req, res) => {
        let reminderToFind = req.params.id;
        let user = await req.user
        let searchResult = user.reminders.find(reminder => reminder.id == reminderToFind)
        res.render('reminder/edit', {
            reminderItem: searchResult
        })
    },

    update: async(req, res) => {
        let getUser = await req.user
        const searchResult = getUser.reminders.find(reminder => reminder.id == req.params.id);
        const updateReminder = await prisma.reminder.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title: req.body.title,
                description: req.body.description,
                //Returns True to the single-reminder ejs page if the 'completed' variable in req.body.completed is 'true, else it returns False
                completed: req.body.completed === 'true'
            }
        });
        res.render('reminder/single-reminder', {
            reminderItem: updateReminder
        });
    },

    delete: async(req, res) => {
        let getUser = await req.user
        const deleteReminder = await prisma.reminder.delete({
            where: {id: parseInt(req.params.id)}
        })
        res.redirect('/reminders')
    }
};

module.exports = remindersController;
