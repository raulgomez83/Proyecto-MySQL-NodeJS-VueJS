require('dotenv').config();
const {
  getConnection
} = require('../../db');
const {
  generateError
} = require('../../helpers');

async function getSearchPresentations(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const {
      text
    } = req.query;
    const result = await connection.query(
      `SELECT title,presentation_event,city,category,presentation_language
  FROM presentations WHERE title LIKE ? OR presentation_event LIKE ? OR city LIKE ? OR category LIKE ?
  ORDER BY title`,
      [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`]
    );
    const [presentationData] = result;
    if (!presentationData.length) {
      throw generateError('Presentation list is empty', 401);
    }
    res.send({
      staus: 'ok',
      data: presentationData
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getSearchPresentations
};