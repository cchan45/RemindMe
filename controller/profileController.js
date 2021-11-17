const { Database } = require('../database')
require('dotenv').config()
const axios = require('axios').default;

let profileController = {
    displayProfile: (req, res) => {
        //if user doesn't have a profile picture in the database (usually for users who are registering)
        if (req.user.profile_picture === undefined){ 
            //get request for a profile picture
            axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS}`) 
              .then((response) => {
                  //finds the user in the database
                  const searchUser = Database.find(user => user.id === req.user.id) 
                  //adds the picture link (from UnsplashAPI) into their account
                  searchUser['profile_picture'] = response.data.urls.small 
                  //renders their profile with a random profile picture
                  res.render('profile/profile') 
              })
              .catch((err) => res.render(err))
        } else { 
            //if a user has a picture in the database already
            res.render('profile/profile')
        }
    }, 
};

module.exports = profileController