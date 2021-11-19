const { Database } = require('../database');
require('dotenv').config();
const axios = require('axios').default;

let profileController = {

    displayProfile: (req, res) => {
        if (req.user.profile_picture !== undefined) {
            return res.render('profile/profile');
        }

        axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS}`)
            .then(response => {
                const searchUser = Database.find(user => user.id === req.user.id);
                searchUser.profile_picture = response.data.urls.small;
                res.render('profile/profile');
            })
            .catch(err => res.render(err));
    },
};

module.exports = profileController