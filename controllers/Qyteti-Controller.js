const User = require('../models/User');
const Qyteti = require('../models/Qyteti');
const Product = require('../models/Product');
const { Query } = require('mongoose');

module.exports = {
  krijoQytet: async (req, res) => {
    const qytetet = await Qyteti.find({}).lean();
    try {
      const newQytet = new Qyteti({
        name: req.body.name,
      });

      const savedQytet = await newQytet.save();
      console.log({ savedQytet });

      res.redirect('/?newcity=true');
    } catch (error) {
      console.log(error);
    }
    console.log({ qytetet });
  },
  shfaq: (req, res) => {
    res.render('qyteti/shfaq');
  },
};
