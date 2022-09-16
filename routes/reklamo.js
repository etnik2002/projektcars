const router = require('express').Router();
const { kerkohetIdentifikimi } = require('../middleware/auth');
const { businessUpload } = require('../middleware/multer');
const {
  getReklama,
  postCreateReklama,
  shfaqBizneset,
  getSingleCompany,
  getUserCompany,
} = require('../controllers/Reklama-Controller');

router.get('/biznes', kerkohetIdentifikimi, getReklama);

router.post(
  '/biznes',
  businessUpload.single('businessImage', 12),
  postCreateReklama
);

router.get('/teGjitha', shfaqBizneset);

router.get('/:id', getUserCompany);

module.exports = router;
