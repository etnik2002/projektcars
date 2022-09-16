const bcrypt = require('bcrypt');

// import schemas

const User = require('../models/User');
const Product = require('../models/Product');
const Reklama = require('../models/Reklamo');
const Category = require('../models/Category');

module.exports = {
  getUsers: (req, res) => {
    res.send('user  page');
  },
  getRegister: (req, res) => {
    res.render('users/signup', { title: 'Regjistrohu tani' });
  },
  postRegister: async (req, res) => {
    try {
      const { username, phone, email, password, vendbanimi } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log({ hashedPassword });

      const newUser = new User({
        username,
        phone,
        vendbanimi,
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
    try {
      let useri = await User.findById(req.params.id).lean();
      console.log({ useri });

      if (!useri) {
        res.redirect('users/profile?sukses=JO');
      }

      await User.deleteOne({ _id: req.params.id });
      console.log('u fshi useri');

      res.redirect('/?sukses=PO');
    } catch (error) {
      console.log(error);
      res.redirect('/?sukses=JO');
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
  getAdmins: async (req, res) => {
    const adminUser = await User.find(req.user.userRole === 'admin').lean();
    console.log({ adminUser });
  },
  allUsersLength: async (req, res) => {
    const allUsers = await User.find({}).lean();

    res.render('allUsersAdmin', { allUsers });
  },
  getUserCompany: async (req, res) => {
    const userCompany = await Reklama.find({ User: req.user._id }).lean();
    console.log('user company : ' + userCompany);
    res.render('reklama/userCompany', { userCompany });
  },
  postDeleteCompany: async (req, res) => {
    console.log(req.params);
    try {
      let kompania = await Reklama.findById(req.params.id).lean();
      console.log({ kompania });

      if (!kompania) {
        res.redirect('users/userCompany?deletedCompany=JO');
      }

      await Reklama.deleteOne({ _id: req.params.id });
      console.log('u fshi kompania');

      res.redirect('/?deletedCompany=PO');
    } catch (error) {
      console.log(error);
      res.redirect('/?deletedCompany=JO');
    }
  },
  getWishlist: async (req, res) => {
    const user = await User.find({ _id: req.user.id });
    const product = await Product.find({ _id: req.user.wishlistId });
    console.log(req.body.wishlistId, 'wishlistid');
    console.log(user);
    res.render('users/wishlist', { user, product });
  },
  postWishlist: async (req, res) => {
    try {
      console.log('hini');
      const wishList = [];
      const user = await User.find({ _id: req.user.id }).lean();
      const product = await Product.findById(req.params.id).lean();
      console.log({ user });
      console.log({ product });
      wishList.push({ product });
      const saveUser = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { wishlistId: product._id } },
        { new: true }
      );
      await saveUser.save();
      console.log('req user wishlistid ');
      res.redirect('/users/wishlist?added-to-wishlist=true');
    } catch (error) {
      console.log(error);
      res.redirect('/products?added-to-wishlist=false');
    }
  },
  getAdminDashboard: async (req, res) => {
    function shtoZero(n) {
      return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }

    const allUsers = await User.find({}).lean();
    const adminUser = await User.find({ userRole: 'admin' });
    const categories = await Category.find({}).lean();
    const allProds = await Product.find({}).lean();
    const companies = await Reklama.find({}).lean();

    let date = new Date();
    let dita = date.getDate();
    let sahati = date.getHours();
    let minuta = date.getMinutes();
    let muaji = date.getMonth();
    let sekonda = date.getSeconds();
    let viti = date.getFullYear();

    switch (muaji) {
      case 0:
        muaji = 'Janar';
        break;
      case 1:
        muaji = 'Shkurt';
        break;
      case 2:
        muaji = 'Mars';
        break;
      case 3:
        muaji = 'Pril';
        break;
      case 4:
        muaji = 'Maj';
        break;
      case 5:
        muaji = 'Qershor';
        break;
      case 6:
        muaji = 'Korrik';
        break;
      case 7:
        muaji = 'Gusht';
        break;
      case 8:
        muaji = 'Shtator';
        break;
      case 9:
        muaji = 'Tetor';
        break;
      case 10:
        muaji = 'Nëntor';
        break;
      case 11:
        muaji = 'Dhjetor';
        break;
    }

    const DATA = `${shtoZero(dita)} ${shtoZero(muaji)} ${viti} - ${shtoZero(
      sahati
    )}:${shtoZero(minuta)}:${shtoZero(sekonda)}`;

    let sotPosts = await Product.find({
      createdAt: {
        $gte: new Date().getTime() - 24 * 60 * 60 * 1000,
        $lt: new Date().getTime(),
      },
    });

    let gjePosts = await Product.find({
      createdAt: {
        $gte: new Date().getTime() - 24 * 60 * 60 * 1000 * 2,
        $lt: new Date().getTime() - 24 * 60 * 60 * 1000,
      },
    });

    let veturatThisWeek = await Product.find({
      createdAt: {
        $gte: new Date().getTime() - 24 * 60 * 60 * 1000 * 7,
        $lt: new Date().getTime(),
      },
    });

    // console.log(veturatThisWeek.length, 'java');
    // console.log(sotPosts.length, 1);
    // console.log(gjePosts.length, 2);

    let totali = sotPosts.length + gjePosts.length;
    let perqindjaPostimeve = (totali / gjePosts.length) * 100;

    let sotKompanit = await Reklama.find({
      createdAt: {
        $gte: new Date().getTime() - 24 * 60 * 60 * 1000,
        $lt: new Date().getTime(),
      },
    });

    let gjeKompanit = await Reklama.find({
      createdAt: {
        $gte: new Date().getTime() - 24 * 60 * 60 * 1000 * 2,
        $lt: new Date().getTime() - 24 * 60 * 60 * 1000,
      },
    });

    let totaliKompanit = sotKompanit.length + gjeKompanit.length;
    let perqindjaKompanive = (totaliKompanit / gjeKompanit.length) * 100;

    // console.log(sotKompanit.length, 'sot');
    // console.log(gjeKompanit.length, 'gje');

    res.render('adminPanel', {
      allUsers,
      adminUser,
      categories,
      allProds,
      companies,
      DATA,
      totali,
      perqindjaPostimeve,
      perqindjaKompanive,
      totaliKompanit,
      veturatThisWeek,
    });
  },
  adminat: async (req, res) => {
    const ADMINAT = await User.find({ userRole: 'admin' });
    res.render('adminAcc', { ADMINAT });
  },
};
