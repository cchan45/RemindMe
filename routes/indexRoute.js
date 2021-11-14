const express = require("express");
const router = express.Router();
const reminderController = require('../controller/reminder_controller');
const {ensureAuthenticated} = require("../middleware/checkAuth");

// Ensures that a user is logged in to access the dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render("dashboard"))

router.get('/reminders', ensureAuthenticated, reminderController.list);

router.get('/reminder/new', ensureAuthenticated, reminderController.new);

/*routes below only work if the user is logged in 
(i.e. doesn't need "ensureAuthenticated" function inside these routes)
*/
router.get('/reminder/:id', reminderController.listOne);

router.get('/reminder/:id/edit', reminderController.edit);

router.post('/reminder/', reminderController.create);

router.post('/reminder/update/:id', reminderController.update);

router.post('/reminder/delete/:id', reminderController.delete);

module.exports = router;
