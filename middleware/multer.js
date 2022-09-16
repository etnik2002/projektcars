const multer = require('multer');

//category upload

var catSorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/category');
  },
  // filename: function (req, file, cb) {
  //   cb(null, Date.now() + '-' + file.originalname);
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ' - ' + file.originalname);
  },
});

var catUpload = multer({ storage: catSorage });

//product upload

var productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var productUpload = multer({ storage: productStorage });

// business upload

var businessStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/business');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var businessUpload = multer({ storage: businessStorage });

//businessUpload

module.exports = { catUpload, productUpload, businessUpload };
