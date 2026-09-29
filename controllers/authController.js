const passport = require('../config/passport.js');
const bcrypt = require('bcryptjs');
const db = require('../db/queries.js');

const login_get = (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', { messages, title: 'Login' });
};

const login_post = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureMessage: true,
});

const register_get = (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('register', { messages, title: 'Sign Up' });
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
  res.render('profile', { username: req.user.username, title: 'Profile' });
};

const logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};

const edit_get = (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('edit', { username: req.user.username, messages, title: 'Edit username' });
};

const edit_post = async (req, res, next) => {
  try {
    await db.updateUsername(req.user.id, req.body.username);
    res.redirect('/profile');
  } catch (err) {
    if (err.code === '23505') {
      req.session.messages = ['Username already taken'];
      return res.redirect('/profile/edit');
    }
    next(err);
  }
};

const password_get = (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('password', { messages, title: 'Change password' });
};

const password_post = async (req, res, next) => {
  try {
    const { current_password, new_password } = req.body;

    const match = await bcrypt.compare(current_password, req.user.password);
    if (!match) {
      req.session.messages = ['Current password is incorrect'];
      return res.redirect('/profile/password');
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await db.updatePassword(req.user.id, hashedPassword);

    res.redirect('/profile');
  } catch (err) {
    next(err);
  }
};

const delete_post = async (req, res, next) => {
  try {
    await db.deleteUser(req.user.id);

    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login_get,
  login_post,
  register_get,
  register_post,
  profile_get,
  logout_get,
  edit_get,
  edit_post,
  password_get,
  password_post,
  delete_post,
};
