const pool = require('./pool');

const createUser = async (username, password) => {
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
    username,
    password,
  ]);
};

const findUserByName = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const updateUsername = async (id, username) => {
  await pool.query('UPDATE users SET username = $1 WHERE id = $2', [
    username,
    id,
  ]);
};

const updatePassword = async (id, hashedPassword) => {
  await pool.query('UPDATE users SET password = $1 WHERE id = $2', [
    hashedPassword,
    id,
  ]);
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
  createUser,
  findUserByName,
  findUserById,
  updateUsername,
  updatePassword,
  deleteUser,
};
