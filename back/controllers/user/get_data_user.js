require('dotenv').config();

const {
  getConnection
} = require('../../db');
const {
  generateError,
  formatDateToDB
} = require('../../helpers');

async function getUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const {
      id
    } = req.params;

    const [result] = await connection.query(
      `SELECT user_id ,date_account_creation,username,firstname,
      surname,
      email,
      birthdate,role FROM users WHERE user_id=?`,
      [id]
    );
    if (!result.length) {
      throw generateError(`There is not user with the id ${id}`, 404);
    }
    const [userData] = result;
    let payload = {};
    if (userData.user_id === req.auth.id || req.auth.role === 'admin') {
      payload.username = userData.username;
      payload.role = userData.role;
      payload.date_account_creation = formatDateToDB(userData.date_account_creation);
      payload.username = userData.username;
      payload.firstname = userData.firstname;
      payload.surname = userData.surname;
      payload.email = userData.email;
      payload.birthdate = formatDateToDB(userData.birthdate);
    } else {
      throw generateError('This is not your business', 401);
    }
    res.send({
      status: 'ok',
      data: payload
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getUser
};