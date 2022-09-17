const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Reklama = require('../models/Reklamo');
const { Query } = require('mongoose');

module.exports = {
  getReklama: async (req, res) => {
    const teGjithaBizneset = await Reklama.find({}).lean();
    console.log({ teGjithaBizneset });
    res.render('reklama/reklamoBiznesin');
  },

  postCreateReklama: async (req, res) => {
    let date = new Date();
    let dita = date.getDate();
    let sahati = date.getHours();
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
    function shtoZero(n) {
      return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }
    const DATA = `${shtoZero(dita)} ${shtoZero(muaji)} - ${shtoZero(
      sahati
    )}:${shtoZero(minuta)}`;

    try {
      const newBiznes = new Reklama({
        businessName: req.body.businessName,
        businessCategory: req.body.businessCategory,
        User: req.user._id,
        ownerName: req.body.ownerName,
        ownerPhone: req.body.ownerPhone,
        businessPhone: req.body.businessPhone,
        businessEmail: req.body.businessEmail,
        website: req.body.website,
        businessDescription: req.body.businessDescription,
        businessImage: req.file.filename,
        businessLocation: req.body.businessLocation,
        adresa: req.body.adresa,
        DATA,
      });
      const savedBusiness = await newBiznes.save();
      console.log({ savedBusiness });
      res.redirect('/?newBusiness=true');
    } catch (error) {
      if (error) {
        console.log(error);
        res.redirect('/?newBusiness=false');
      }
    }
  },
  shfaqBizneset: async (req, res) => {
    const teGjithaBizneset = await Reklama.find({}).lean();
    res.render('reklama/bizneset', { teGjithaBizneset });
  },
  getSingleCompany: async (req, res) => {
    console.log(req.params.id);
    const singleCompany = await Reklama.findById({ _id: req.params.id });
    // res.render('reklama/singleCompany', { singleCompany });
    res.send('Feasfes');
  },
  getUserCompany: async (req, res) => {
    // return user data and user products
    console.log('useri : ' + req.user);
    if (!req.user) {
      res.redirect('/users/login');
    }
    try {
      const userCompany = await Reklama.find({ User: req.user._id }).lean();
      const user = req.user;
      console.log({ user });
      res.render('users/profile', { userCompany, user });
      // res.send('fesfaesf');
      console.log({ userCompany });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  },
};
