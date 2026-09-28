const express = require('express');

const {
  login_get,
  login_post,
  register_get,
  register_post,
  profile_get,
  logout_get,
} = require('../controllers/authController.js');

const {
  ensureAuthenticated,
  ensureGuest,
} = require('../middlewares/middleware.js');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/login'));
router.get('/login', ensureGuest, login_get);
router.post('/login', ensureGuest, login_post);
router.get('/register', ensureGuest, register_get);
router.post('/register', ensureGuest, register_post);
router.get('/profile', ensureAuthenticated, profile_get);
router.get('/logout', ensureAuthenticated, logout_get);

module.exports = router;
