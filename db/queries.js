const pool = require('./pool');

const createUser = async (username, password) => {
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
    username,
    password,
  ]);
};

module.exports = {
  createUser,
};
