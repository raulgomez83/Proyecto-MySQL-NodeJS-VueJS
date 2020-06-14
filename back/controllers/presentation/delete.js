require('dotenv').config();

const {
  getConnection
} = require('../../db');
const {
  generateError,
  deleteFile
} = require('../../helpers');

async function deletePresentation(req, res, next) {
  let connection;
  try {
    const {
      id
    } = req.params;
    connection = await getConnection();
    const [
      currentvideo
    ] = await connection.query(
      'SELECT video FROM presentations WHERE presentation_id=?',
      [id]
    );
    if (!currentvideo.length) {
      throw generateError(`There is no entry with id ${id}`, 400);
    }
    if (currentvideo.avatar) {
      await deleteFile(current.avatar);
    }
    const [
      current
    ] = await connection.query(
      'SELECT  user_id FROM presentations WHERE presentation_id=?',
      [id]
    );
    console.log(current[0]);
    if (!current.length) {
      throw generateError(`There is no presentation with id ${id}`, 400);
    }
    if (current[0].user_id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('Just administrator can do this', 400);
    }
    await connection.query(
      'DELETE FROM presentations WHERE presentation_id=?',
      [id]
    );
    res.send({
      status: 'ok',
      message: `Presentation with id ${id} was deleted `
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
  deletePresentation
};