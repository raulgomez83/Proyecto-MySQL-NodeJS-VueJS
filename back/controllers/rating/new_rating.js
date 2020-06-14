require('dotenv').config();
const {
  getConnection
} = require('../../db');
const {
  newRatingSchema
} = require('../../validations/rating');
const {
  generateError
} = require('../../helpers');

async function newRating(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    await newRatingSchema.validateAsync(req.body);
    const userid = req.auth.id;
    const presid = req.params.id;

    const {
      score_interest,
      score_theme_quality,
      score_design,
      score_comunication,
      comments
    } = req.body;

    const [
      rating_id
    ] = await connection.query(
      'SELECT id FROM ratings WHERE user_id_ratings=? AND presentation_id_ratings=?',
      [userid, presid]
    );
    if (rating_id.length) {
      throw generateError('You can not vote again', 404);
    }
    const rating =
      (Number(score_interest) +
        Number(score_theme_quality) +
        Number(score_design) +
        Number(score_comunication)) /
      4;
    await connection.query(
      'INSERT INTO ratings (rating, score_interest, score_theme_quality,score_design,score_comunication,date_rating, comments,user_id_ratings,presentation_id_ratings) VALUES(?,?,?,?,?,NOW(),?,?,? )',
      [
        rating,
        score_interest,
        score_theme_quality,
        score_design,
        score_comunication,
        comments,
        userid,
        presid
      ]
    );

    res.send({
      status: 'ok',
      message: 'Your vote was send properly: Thanks for participate'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = {
  newRating
};