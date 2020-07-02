require('dotenv').config();

const { getConnection } = require('../../db');

async function getPresentationsTops3(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const [resultLast] = await connection.query(
      `SELECT title,video,date_louded_presentation
FROM presentations  ORDER BY date_louded_presentation DESC LIMIT 3 `
    );
    const [resultRatings] = await connection.query(
      `SELECT p.title,p.video,round(AVG(r.rating),1) AS rating 
FROM presentations p 
INNER JOIN ratings r on p.presentation_id= r.presentation_id_ratings
GROUP BY r.presentation_id_ratings ORDER BY rating DESC LIMIT 3`
    );
    const [resultViews] = await connection.query(
      `SELECT p.title,p.video,round(AVG(v.total_views),0) AS totalviews
FROM presentations p 
INNER JOIN views v on p.presentation_id= v.presentation_id_views
GROUP BY v.presentation_id_views ORDER BY totalviews DESC LIMIT 3`
    );
    const totalResult = {
      resultLast,
      resultRatings,
      resultViews
    };

    res.send({
      status: 'ok',
      data: totalResult
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getPresentationsTops3
};
