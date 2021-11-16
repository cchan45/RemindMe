let profileController = {
    displayProfile: (req, res) => {
        console.log(req.user)
        res.render('profile/profile', { user: req.user} )
    }, 
};

module.exports = profileController