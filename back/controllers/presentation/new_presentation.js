require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { newPresentationSchema } = require('../../validations/presentation');

async function newPresentation(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    await newPresentationSchema.validateAsync(req.body);
    const {
      title,
      presentation_date,
      presentation_event,
      city,
      category,
      presentation_language,
      video
    } = req.body;
    const { id } = req.auth;
    const [
      current
    ] = await connection.query(
      ` SELECT user_id FROM presentations WHERE user_id=?`,
      [id]
    );
    if (!current.length) {
      await connection.query(
        `UPDATE users SET role="loader" WHERE user_id=? `,
        [id]
      );
    }
    const [
      existingtitle
    ] = await connection.query(
      'SELECT title FROM presentations WHERE title=?',
      [title]
    );
    if (existingtitle.length) {
      throw generateError('The title already exists on the DB', 409);
    }
    await connection.query(
      `INSERT INTO presentations (title,presentation_date, presentation_event, city,category,presentation_language,date_louded_presentation,video,user_id) VALUES  (?,?,?,?,?,?,NOW(),?,?)`,
      [
        title,
        presentation_date,
        presentation_event,
        city,
        category,
        presentation_language,
        video,
        id
      ]
    );
    res.send({
      status: 'ok',
      message: 'Presentation created properly'
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
  newPresentation
};
