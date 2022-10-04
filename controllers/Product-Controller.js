//import schemas

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { Query } = require('mongoose');
const Reklama = require('../models/Reklamo');
const mongoose = require('mongoose');

module.exports = {
  getProducts: async (req, res) => {
    const allProducts = await Product.find({})
      .sort({ createdAt: 'desc' })
      .lean();
    res.render('products/index', { allProducts });
  },
  allProdsAdmin: async (req, res) => {
    const allProducts = await Product.find({})
      .sort({ createdAt: 'desc' })
      .lean();
    res.render('admin', { allProducts });
  },
  adminDeleteAllPosts: async (req, res) => {
    console.log(req.params);
    try {
      let produkti = await Product.findById(req.params.id).lean();
      if (req.user.userRole === 'admin') {
        console.log({ produkti });
        if (!produkti) {
          res.redirect('/products?deleted=JO');
        }
        await Product.deleteOne({ _id: req.params.id });
        res.redirect('/products?deleted=PO');
      }
    } catch (error) {
      console.log(error);
      res.redirect('users/profile?deleted=JO');
    }
  },
  getCreateProduct: async (req, res) => {
    const categories = await Category.find({}).lean();
    res.render('products/create', { categories });
  },
  postCreateProduct: async (req, res) => {
    function shtoZero(n) {
      return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }

    let date = new Date();
    let dita = date.getDate();
    let sahati = date.getHours() + 2;
    let minuta = date.getMinutes();
    let muaji = date.getMonth();

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

    const DATA = `${shtoZero(dita)} ${shtoZero(muaji)} - ${shtoZero(
      sahati
    )}:${shtoZero(minuta)}`;

    const { name, category, price, description, notification } = req.body;

    console.log(req.user);
    console.log(req.body);
    console.log(req.file);
    const {
      year,
      kubikazha,
      menjachi,
      karburanti,
      location,
      killometrazha,
      hp,
    } = req.body;
    console.log(req.files, 323);
    try {
      const fotot = [];
      req.files.forEach((x) => {
        fotot.push(x.filename);
      });
      console.log({ fotot });

      const categories = await Category.find({}).lean();

      const newProduct = new Product({
        name,
        category,
        price,
        description,
        location,
        year,
        hp,
        transmetuesi: req.body.transmetuesi,
        karburanti,
        kubikazha: kubikazha,
        menjachi,
        killometrazha,
        DATA,
        // image: process.filename,
        // image: req.files.filename,
        image: fotot,
        User: req.user._id,
        seller: req.user.username,
        phone: req.user.phone,
      });

      const savedProduct = await newProduct.save();
      console.log(savedProduct);

      // User.notification = `You have a new post ${savedProduct.name} `;

      // console.log(User.notification);

      res.redirect('/products/');
    } catch (error) {
      if (error) {
        console.log(error);
        res.redirect('/products/create?success=false');
      }
    }
  },
  getSingleProduct: async (req, res) => {
    console.log('Product ID : ' + req.params.id);
    const singleProduct = await Product.findById({ _id: req.params.id });
    console.log({ singleProduct });
    res.render('products/singleproduct', { singleProduct });
  },

  getAdminEditPost: async (req, res) => {
    if (req.user.userRole == 'admin') {
      let produkti = await Product.findOne({ _id: req.params.id }).lean();
      if (!produkti) {
        return res.redirect('/?ska=true');
      } else {
        res.render('products/edit', { prod: produkti });
      }
    } else {
      return;
    }
  },
  postAdminEditPost: async (req, res) => {
    try {
      const prodUpdate = {
        name: req.body.name, //
        price: req.body.price, //
        description: req.body.description, //
        kubikazha: req.body.kubikazha, //
        location: req.body.location, //
        year: req.body.year, //
        hp: req.body.hp, //
        karburanti: req.body.karburanti, //
        killometrazha: req.body.killometrazha, //
        transmetuesi: req.body.transmetuesi, //
      };

      let prodId = {
        _id: req.params.id,
      };

      const updateProd = await Product.findOneAndUpdate(prodId, prodUpdate);

      if (updateProd) {
        res.redirect('/users/profile?updated=PO');
        console.log('u bo update');
      } else {
        res.redirect('/users/profile?updated=JO');
        console.log('nuk u bo update');
      }
    } catch (error) {
      console.log(error);
    }
  },
  getEditSingle: async (req, res) => {
    let produkti = await Product.findOne({ _id: req.params.id }).lean();

    if (!produkti) {
      return res.redirect('/?nuk-egzistion');
    }

    if (produkti.User == req.user.id || req.user.userRole === 'admin') {
      res.render('products/edit', { prod: produkti });
    } else {
      res.redirect('/');
      console.log('posti nuk osh i joti');
    }
  },
  postEditSingle: async (req, res) => {
    try {
      const prodUpdate = {
        name: req.body.name, //
        price: req.body.price, //
        description: req.body.description, //
        kubikazha: req.body.kubikazha, //
        location: req.body.location, //
        year: req.body.year, //
        hp: req.body.hp, //
        karburanti: req.body.karburanti, //
        killometrazha: req.body.killometrazha, //
        transmetuesi: req.body.transmetuesi, //
      };

      let prodId = {
        _id: req.params.id,
      };

      const updateProd = await Product.findOneAndUpdate(prodId, prodUpdate);

      if (updateProd) {
        res.redirect('/users/profile?updated=PO');
        console.log('u bo update');
      } else {
        res.redirect('/users/profile?updated=JO');
        console.log('nuk u bo update');
      }
    } catch (error) {
      console.log(error);
    }
  },
  postDeleteSingle: async (req, res, next) => {
    console.log(req.params);
    try {
      let produkti = await Product.findById(req.params.id).lean();
      console.log({ produkti });
      if (!produkti) {
        res.redirect('users/profile?sukses=JO');
      }
      if (produkti.User != req.user.id) {
        res.redirect('/users/profile?sukses=JO');
      } else {
        await Product.deleteOne({ _id: req.params.id });
        res.redirect('/users/profile?sukses=PO');
      }
    } catch (error) {
      console.log(error);
      res.redirect('users/profile?deleted=JO');
    }
  },

  searchedProducts: async (req, res) => {
    let query = req.query.search;
    console.log({ query });
    Product.find(
      {
        $text: { $search: query },
      },
      (err, newSearch) => {
        try {
          res.render('products/index', { allProducts: newSearch });
        } catch (err) {
          if (err) {
            res.redirect('errors/404');
          }
          if (newSearch.length < 0) {
            res.redirect('/');
          }
        }
      }
    );
  },
};
