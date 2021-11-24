const express = require('express');
const router = express.Router();
const reminderController = require('../controller/reminderController');
const adminController = require('../controller/adminController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/checkAuth');
const profileController = require('../controller/profileController');

// Ensures that a user is logged in to access the dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    let user = req.user
        .then((result) => {
            res.render('dashboard')
        })
})

router.get('/reminders', ensureAuthenticated, reminderController.list);

router.get('/reminder/new', ensureAuthenticated, reminderController.new);

//routes below only work if the user is logged in

router.get('/reminder/:id', reminderController.listOne);

router.get('/reminder/:id/edit', reminderController.edit);

router.post('/reminder/', ensureAuthenticated, reminderController.create);

router.post('/reminder/update/:id', reminderController.update);

router.post('/reminder/delete/:id', reminderController.delete);

router.get('/admin', ensureAdmin, adminController.listSessions);
router.get('/admin/revoke/:sessionId', ensureAdmin, adminController.revokeSession);

router.get('/profile', ensureAuthenticated, profileController.displayProfile);

module.exports = router;
