require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getAllRatings(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.query(
      `SELECT id, rating, score_interest,score_theme_quality,score_design,score_comunication,date_rating,comments,user_id_ratings,presentation_id_ratings
  FROM ratings
  ORDER BY presentation_id_ratings`
    );

    const [usersData] = result;

    if (!usersData.length) {
      throw generateError('Presentation list is empty', 401);
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
module.exports = { getAllRatings };
