const db = require('../db/queries.js');

const home_get = (req, res) => {
  res.render('index');
};

const login_get = (req, res) => {
  res.render('login');
};

const register_get = (req, res) => {
  res.render('register');
};

const register_post = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await db.createUser(username, password);

    res.redirect('/login');
  } catch (err) {
    next(err);
  }
};

const profile_get = (req, res) => {
  res.render('profile');
};

const logout_get = (req, res) => {
  res.redirect('/');
};

module.exports = {
  home_get,
  login_get,
  register_get,
  register_post,
  profile_get,
  logout_get,
};
