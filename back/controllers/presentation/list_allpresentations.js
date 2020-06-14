require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getAllPresentations(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.query(
      `SELECT p.presentation_id,p.title,p.presentation_date,p.presentation_event,p.city,p.category,r.presentation_id_ratings, p.presentation_language,p.video,ROUND(AVG(r.rating),1) AS rating ,ROUND(AVG(v.total_views),0) AS totalviews
FROM presentations p 
INNER JOIN ratings r ON p.presentation_id= r.presentation_id_ratings 
INNER JOIN views v ON p.presentation_id= v.presentation_id_views GROUP BY presentation_id`
    );
    const [usersData] = result;

    if (!usersData.length) {
      throw generateError('Presentation list is empty', 401);
    }

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
  getAllPresentations
};
