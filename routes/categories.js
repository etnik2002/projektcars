// const router = require('express').Router(); i njejt si 2 reshtat posht
const express = require('express');
const router = express.Router();

//import middlewares

const { isAdmin } = require('../middleware/auth');

//import nga controllers

const {
  getCategories,
  getCreate,
  postCreate,
  getSingleCatPost,
  postDeleteCat,
} = require('../controllers/Category-Controllers');

//import multer from middleware

const { catUpload } = require('../middleware/multer');

// route for this file http://localhost:5000/categories

router.get('/', isAdmin, getCategories);

//get create category page http://localhost:5000/categories/create
router.get('/create', isAdmin, getCreate);

//get category info from form
router.post('/create', isAdmin, catUpload.single('catImg'), postCreate);

//get category products

router.get('/cats', isAdmin, getSingleCatPost);

router.post('/delete/:id', postDeleteCat);

module.exports = router;
