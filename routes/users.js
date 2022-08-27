const router = require('express').Router();
const passport = require('passport');

//import controllers
const {
  getUsers,
  getRegister,
  postRegister,
  getLogin,
  getUserProfile,
  postDeleteAccount,
  getAllUsers,
  showAllUsers,
} = require('../controllers/User-Controller');

router.get('/', getUsers);

//show register form

router.get('/register', getRegister);

//read user submit form

router.post('/register', postRegister);

//get user login page

router.get('/login', getLogin);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login?succes=false',
  })
);

router.get('/profile', getUserProfile);

//logout user

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/users/login');
  });
});

router.post('/delete', postDeleteAccount);

router.get('/all', getAllUsers);

router.get('/showall', showAllUsers);

module.exports = router;
