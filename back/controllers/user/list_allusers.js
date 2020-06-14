require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getAllUsers(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const result = await connection.query(
      `SELECT user_id, username,email,date_account_creation
  FROM users
  ORDER BY date_account_creation`
    );

    const [usersData] = result;

    if (!usersData.length) {
      throw generateError('User list is empty', 401);
    }

    res.send({
      staus: 'ok',
      data: usersData
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getAllUsers
};
