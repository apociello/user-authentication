const home_get = (req, res) => {
  res.render('index');
};

const login_get = (req, res) => {
  res.render('login');
};

const register_get = (req, res) => {
  res.render('register');
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
  profile_get,
  logout_get
};