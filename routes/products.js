const router = require('express').Router();
const { kerkohetIdentifikimi, isAdmin } = require('../middleware/auth');

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
  allProdsAdmin,
  adminDeleteAllPosts,
  getAdminEditPost,
  postAdminEditPost,
} = require('../controllers/Product-Controller');

//url is : http://localhost:5000/products
router.get('/search', searchedProducts);

router.get('/all', isAdmin, allProdsAdmin);

//get all products

router.get('/', getProducts);

//get create product
router.get('/create', kerkohetIdentifikimi, getCreateProduct);

//post create new product
router.post('/create', productUpload.array('image'), postCreateProduct);

//get single product page

router.get('/:id', getSingleProduct);

//edit single pdoduct

router.get('/edit/:id', getEditSingle);
//edit product
router.post('/edit/:id', postEditSingle);

//delete single product

router.post('/delete/:id', postDeleteSingle);

//search

router.post('/deleteAll/:id', adminDeleteAllPosts);

router.get('/adminEdit/:id', getAdminEditPost);

router.post('adminEdit/:id', postAdminEditPost);

module.exports = router;
