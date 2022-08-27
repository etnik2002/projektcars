const router = require('express').Router();
const { krijoQytet, shfaq } = require('../controllers/Qyteti-Controller');
const { isAdmin } = require('../middleware/auth');

router.get('/create', (req, res) => {
  res.render('qyteti/createQytet');
});
router.post('/create', isAdmin, krijoQytet);

router.get('/qytetet', shfaq);

module.exports = router;
