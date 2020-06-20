require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const {
  updatePresentationSchema
} = require('../../validations/update_presentations');
async function updatePresentation(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    await updatePresentationSchema.validateAsync(req.body);
    const { id } = req.params;
    const {
      title,
      presentation_date,
      presentation_event,
      city,
      category,
      presentation_language,
      video
    } = req.body;
    const [
      current
    ] = await connection.query(
      ` SELECT user_id FROM presentations WHERE presentation_id=?`,
      [id]
    );
    if (!current.length) {
      throw generateError(`The presentation with id ${id} does not exist`, 404);
    }
    if (current[0].user_id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError(
        'You are not allowed to update this presentation',
        401
      );
    }
    await connection.query(
      `UPDATE presentations SET  
    title=?,
      presentation_date=?,
      presentation_event=?,
      city=?,
      category=?,
      presentation_language=?,
      video=? WHERE presentation_id=?`,
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
      message: 'Presentation is updated'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  updatePresentation
};
