require('dotenv').config();
const {
  getConnection
} = require('../../db');
const {
  generateError,
  deleteFile
} = require('../../helpers');

async function deleteUser(req, res, next) {
  let connection;
  try {
    const {
      id
    } = req.params;
    connection = await getConnection();

    const [
      currentavatar
    ] = await connection.query('SELECT avatar FROM users WHERE user_id=?', [id]);

    if (!currentavatar.length) {
      throw generateError(`There is no entry with id ${id}`, 400);
    }

    if (currentavatar.avatar) {
      await deleteFile(current.avatar);
    }
    const [
      current
    ] = await connection.query('SELECT  user_id FROM users WHERE user_id=?', [
      id
    ]);

    if (!current.length) {
      throw generateError(`There is no user with id ${id}`, 400);
    }
    if (req.auth.role !== 'admin') {
      throw generateError('Just administrator can do this', 400);
    }

    await connection.query('DELETE FROM users WHERE user_id=?', [id]);

    res.send({
      status: 'ok',
      message: `User with id ${id} was delete for the administrator`
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = {
  deleteUser
};