require('dotenv').config();
const { getConnection } = require('../../db');
const { formatDateToDB } = require('../../helpers');

async function getHistoryUserPresentation(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.auth;
    const [results] = await connection.query(
      `SELECT title,presentation_date,user_id,presentation_id FROM presentations WHERE user_id=?
  ORDER BY date_louded_presentation`,
      [id]
    );

    const formatResult = results.map((result) => {
      result.presentation_date = formatDateToDB(result.presentation_date);
      return result;
    });
    res.send({
      status: 'ok',
      data: formatResult
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
