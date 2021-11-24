const passUser = (req, res, next) => {
  //this is only used if the req.user is wrapped inside of a Promise object
  if (req.user !== undefined) {
    let getUser = req.user
    .then((result) => {
      res.locals.user = result
      next();
    })
  } else {
    res.locals.user = req.user;
    next();
  }
};

module.exports = passUser;