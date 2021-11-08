const express = require("express");
const router = express.Router(); 
const { ensureAuthenticated } = require("../middleware/checkAuth");

router.get("/reminders", ensureAuthenticated, (req, res) => {
    res.render("/reminders");
  });
  
module.exports = router;
