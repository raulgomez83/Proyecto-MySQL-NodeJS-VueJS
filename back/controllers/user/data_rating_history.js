require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getHistoryUserRating(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.auth;

    const [
      result
    ] = await connection.query(
      `SELECT p.title ,r.rating FROM presentations p INNER JOIN ratings r on p.presentation_id= r.presentation_id_ratings WHERE r.user_id_ratings=?`,
      [id]
    );

    const usersData = [result];

    if (!usersData.length) {
      throw generateError('Already you not rate any presentation', 401);
    }
    console.log(result);

    res.send({
      status: 'ok',
      data: result
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getHistoryUserRating
};
