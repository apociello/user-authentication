const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/profile');
  }
  return next();
};

module.exports = {
  ensureAuthenticated,
  ensureGuest,
};
