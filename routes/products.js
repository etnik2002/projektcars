const router = require('express').Router();
const { kerkohetIdentifikimi } = require('../middleware/auth');
const { krijoQytet } = require('../controllers/Qyteti-Controller');

//import multer middleware
const { productUpload } = require('../middleware/multer');

//import controllers
const {
  getProducts,
  getCreateProduct,
  postCreateProduct,
  getSingleProduct,
  getEditSingle,
  postEditSingle,
  postDeleteSingle,
  searchedProducts,
} = require('../controllers/Product-Controller');

//url is : http://localhost:5000/products
router.get('/search', searchedProducts);

//get all products

router.get('/', getProducts);

//get create product
router.get('/create', kerkohetIdentifikimi, getCreateProduct);

//post create new product
router.post('/create', productUpload.single('image'), postCreateProduct);

//get single product page

router.get('/:id', getSingleProduct);

//edit singleh pdoduct

router.get('/edit/:id', getEditSingle);
//edit product
router.post('/edit/:id', postEditSingle);

//delete single product

router.post('/delete/:id', postDeleteSingle);

//search

module.exports = router;
