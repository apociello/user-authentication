const passport = require('../config/passport.js');
const bcrypt = require('bcryptjs');
const db = require('../db/queries.js');

const login_get = (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', { messages });
};

const login_post = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureMessage: true,
});

const register_get = (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('register', { messages });
};

const register_post = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(username, hashedPassword);

    res.redirect('/login');
  } catch (err) {
    if (err.code === '23505') {
      req.session.messages = ['Username already taken'];
      return res.redirect('/register');
    }
    next(err);
  }
};

const profile_get = (req, res) => {
  res.render('profile', { username: req.user.username });
};

const logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};

module.exports = {
  login_get,
  login_post,
  register_get,
  register_post,
  profile_get,
  logout_get,
};
