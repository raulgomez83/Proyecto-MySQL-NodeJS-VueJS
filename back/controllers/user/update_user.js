require('dotenv').config();

const { getConnection } = require('../../db');
const {
  generateError,
  processAndSaveFile,
  deleteFile
} = require('../../helpers');
const { updateUserSchema } = require('../../validations/update_user');

async function updateUser(req, res, next) {
  let connection;

  try {
    await updateUserSchema.validateAsync(req.body);
    connection = await getConnection();

    const { id } = req.params;

    const { firstname, surname, email } = req.body;

    const [
      current
    ] = await connection.query(
      ` SELECT user_id, avatar FROM users WHERE user_id=?`,
      [id]
    );
    if (!current.length) {
      throw generateError(`The user with id ${id} does not exist`, 404);
    }

    if (current[0].user_id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('You can not stay here', 401);
    }
    let savedFileName;

    if (req.files && req.files.avatar) {
      try {
        savedFileName = await processAndSaveFile(req.files.avatar);
        if (current && current.avatar) {
          await deleteFile(current.avatar);
        }
      } catch (error) {
        throw generateError('Avatar is not processed.Try later', 400);
      }
    } else {
      savedFileName = current.avatar;
    }

    await connection.query(
      ` UPDATE users SET firstname=?,surname=?, email=?,avatar=? WHERE user_id=?`,
      [firstname, surname, email, savedFileName, id]
    );
    res.send({
      status: 'ok',
      message: 'User is update'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  updateUser
};
