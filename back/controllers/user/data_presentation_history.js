require('dotenv').config();
const {
  getConnection
} = require('../../db');
const {
  generateError
} = require('../../helpers');

async function getHistoryUserPresentation(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const {
      id
    } = req.auth
    const [result] = await connection.query(
      `SELECT title FROM presentations WHERE user_id=?
  ORDER BY date_louded_presentation`,
      [id]
    );
    if (!result.length) {
      throw generateError('Already you not upload any presentation', 401);
    }
    const [usersData] = result;
    res.send({
      status: 'ok',
      data: usersData
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getHistoryUserPresentation
};