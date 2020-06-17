require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function disableUser(req, res, next) {
  let connection;
  console.log('holi');

  try {
    connection = await getConnection();
    const { id } = req.params;
    const [
      current
    ] = await connection.query(
      'SELECT active, user_id FROM users WHERE user_id=?',
      [id]
    );
    if (!current.length) {
      throw generateError(`There is no entry with id ${id}`, 400);
    }
    if (current[0].user_id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('You are not authorise to disable this user', 401);
    }
    await connection.query(
      `UPDATE users SET active=false,date_password_modification=NOW()  WHERE user_id=?`,
      [id]
    );
    res.send({
      status: 'ok',
      message: 'User is disable.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  disableUser
};
