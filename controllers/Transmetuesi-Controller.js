const express = require('express');
const Transmetuesi = require('../models/Transmetuesi');

module.exports = {
  getTrans: (req, res) => {
    res.render('transmetuesi/transCreate');
  },
  postTrans: async (req, res) => {
    try {
      const newTrans = new Transmetuesi({
        lloji: req.body.lloji,
      });
      const savedTrans = await newTrans.save();
      console.log({ savedTrans });
      res.redirect('/?success=true');
    } catch (error) {
      console.log(error);
      res.redirect('/?success=false');
    }
  },
};
