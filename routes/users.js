const router = require('express').Router();
const passport = require('passport');
const { kerkohetIdentifikimi, isAdmin } = require('../middleware/auth');

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
  allUsersLength,
  getUserCompany,
  postDeleteCompany,
  getWishlist,
  postWishlist,
  getAdminDashboard,
  adminat,
} = require('../controllers/User-Controller');
const { app } = require('cli');

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
    // failureFlash: true,
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

router.post('/delete/:id', postDeleteAccount);

router.get('/all', getAllUsers);

router.get('/showall', showAllUsers);

router.get('/allUsers', isAdmin, allUsersLength);

router.get('/userCompany', kerkohetIdentifikimi, getUserCompany);

router.post('/deleteCompany/:id', postDeleteCompany);

router.get('/wishlist', getWishlist);

router.post('/wishlist/:id', postWishlist);

router.get('/adminDashboard', isAdmin, getAdminDashboard);

router.get('/adminAcc', isAdmin, adminat);

module.exports = router;
