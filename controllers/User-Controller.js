const bcrypt = require('bcrypt');

// import schemas

const User = require('../models/User');
const Product = require('../models/Product');
const { krijoQytet } = require('../controllers/Qyteti-Controller');
module.exports = {
  getUsers: (req, res) => {
    res.send('user  page');
  },
  getRegister: (req, res) => {
    res.render('users/signup', { title: 'Regjistrohu tani' });
  },
  postRegister: async (req, res) => {
    try {
      const { username, phone, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log({ hashedPassword });

      const newUser = new User({
        username,
        phone,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      console.log(savedUser);

      res.redirect('/users/login');
    } catch (error) {
      console.log(error);
    }
  },
  getLogin: function (req, res) {
    res.render('users/signin');
  },
  getUserProfile: async (req, res) => {
    // return user data and user products
    console.log(req.user);
    if (!req.user) {
      res.redirect('/users/login');
    }
    try {
      const userProd = await Product.find({ User: req.user._id }).lean();
      const user = req.user;

      res.render('users/profile', { userProd, user });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  },
  postDeleteAccount: async (req, res, next) => {
    console.log(req.params);
    const userID = req.user.id;
    try {
      let akaunti = await User.findById(req.User.id).lean();
      console.log({ akaunti });
      if (!akaunti) {
        res.redirect('/?egziston=JO');
      }
      if (akaunti.User !== userID) {
        res.redirect('/?sukses=JO');
      } else {
        await User.deleteOne({ _id: userID });
        res.redirect('/?deleted=PO');
      }
    } catch (error) {
      console.log(error);
      res.redirect('/?deleted=JO');
    }
  },
  getAllUsers: async (req, res) => {
    const together = [];
    const allUsers = await User.find({}).lean();
    allUsers.forEach((user) => {
      const all = User.length;
      together.push(allUsers);
      console.log({ together });
    });
  },
  showAllUsers: (req, res) => {
    res.render('users/all');
  },
};
