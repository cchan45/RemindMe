const { Database } = require('../database')
require('dotenv').config()
const axios = require('axios').default;

let profileController = {
    displayProfile: (req, res) => {
        if (req.user.ppic === undefined){ //if user doesn't have a profile picture in the database (usually for users who are registering)
            axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS}`) //get request for a profile picture
              .then((response) => {
                  
                  const searchUser = Database.find(user => user.id === req.user.id) //finds the user in the database
                  searchUser['ppic'] = response.data.urls.small //adds the picture link (from UnsplashAPI) into their account
                  res.render('profile/profile', { user: req.user }) //renders their profile with a random profile picture
              })
              .catch((err) => res.render(err))
        } else { //if a user has a picture in the database already
            res.render('profile/profile', { user: req.user })
        }
    }, 
    //add another function here if needed

};

module.exports = profileController