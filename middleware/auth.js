module.exports = {
  kerkohetIdentifikimi: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/users/login');
    }
  },
  iIdentifikuar: (req, res, next) => {
    if (!isAuthenticated()) {
      return next();
    }
  },
  isAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.userRole === 'admin') {
      return next();
    } else {
      res.redirect('/users/login');
    }
  },
};
