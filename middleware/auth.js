// Handles user logged in or not

module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  },
  // If logged in, don't go to the home page ('/')
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/plandone');
    } else {
      return next();
    }
  },
};
