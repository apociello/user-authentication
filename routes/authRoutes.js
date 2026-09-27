const express = require('express');
const {
  home_get,
  login_get,
  login_post,
  register_get,
  register_post,
  profile_get,
  logout_get,
} = require('../controllers/authController.js');
const { ensureAuthenticated } = require('../middlewares/middleware.js');

const router = express.Router();

router.get('/', home_get);

router.get('/login', login_get);
router.post('/login', login_post);
router.get('/register', register_get);
router.post('/register', register_post);
router.get('/profile', ensureAuthenticated, profile_get);

router.get('/logout', logout_get);

module.exports = router;
