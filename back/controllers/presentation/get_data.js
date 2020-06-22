require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError, formatDateToDB } = require('../../helpers');
async function getPresentation(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const [result] = await connection.query(
      ` SELECT p.presentation_id,p.user_id,p.title,p.presentation_date,p.presentation_event,p.city,p.category,r.presentation_id_ratings, p.presentation_language,p.video,ROUND(AVG(r.rating),1) AS rating ,ROUND(AVG(v.total_views),0) AS totalviews
FROM presentations p 
INNER JOIN ratings r ON p.presentation_id= r.presentation_id_ratings 
INNER JOIN views v ON p.presentation_id= v.presentation_id_views
WHERE presentation_id=? `,
      [id]
    );
    const [
      resultcomments
    ] = await connection.query(
      `SELECT comments FROM ratings WHERE presentation_id_ratings=?`,
      [id]
    );

    if (!result.length) {
      throw generateError(`There is not a presentation with the id ${id}`, 404);
    }
    const [
      totalRatings
    ] = await connection.query(
      `SELECT count(rating) AS totalratings  FROM ratings WHERE presentation_id_ratings=? `,
      [id]
    );

    const [showTotalRatings] = totalRatings;
    const [presentationData] = result;

    const payload = {
      id: presentationData.presentation_id,
      title: presentationData.title,
      presentation_date: formatDateToDB(presentationData.presentation_date),
      presentation_event: presentationData.presentation_event,
      city: presentationData.city,
      category: presentationData.category,
      presentation_language: presentationData.presentation_language,
      video: presentationData.video,
      rating: presentationData.rating,
      totalviews: presentationData.totalviews,
      user_id: presentationData.user_id
    };

    res.send({
      status: 'ok',
      data: {
        payload,
        resultcomments,
        showTotalRatings
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getPresentation
};
