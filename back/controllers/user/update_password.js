require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');
const { updatePasswordSchema } = require('../../validations/update_password');
const { generateError } = require('../../helpers');

async function updatePassword(req, res, next) {
  let connection;
  try {
    const { oldPassword, newPassword, newPasswordRepeat } = req.body;

    const { id } = req.params;
    connection = await getConnection();
    await updatePasswordSchema.validateAsync(req.body);

    if (Number(id) !== req.auth.id) {
      throw generateError(
        `You can not change the password of user with id ${id}`,
        401
      );
    }
    if (newPassword !== newPasswordRepeat) {
      throw generateError(
        'You must write your new password again and must be the same'
      );
    }
    if (oldPassword === newPassword) {
      throw generateError('New password can not be the same that old one', 400);
    }
    console.log('alla');
    // Sacar la info del usuario de la base de datos
    const [currentUser] = await connection.query(
      `
      SELECT user_id, user_password from users where user_id=?
      `,
      [id]
    );

    // Código un poco redundante
    if (!currentUser.length) {
      throw generateError(`The user with id ${id} does not exist`, 404);
    }

    const [dbUser] = currentUser;
    console.log(currentUser);
    // Comprobar que la vieja password envíada sea la correcta
    // el orden es: passord sin encriptar, password encriptada
    const passwordsMath = await bcrypt.compare(
      oldPassword,
      dbUser.user_password
    );

    if (!passwordsMath) {
      throw generateError('Your old password is wrong', 401);
    }

    // generar hash de la password
    const dbNewPassword = await bcrypt.hash(newPassword, 10);

    // actualizar la base de datos
    await connection.query(
      `
      UPDATE users SET user_password=?, date_password_modification=NOW() WHERE user_id=?
    `,
      [dbNewPassword, id]
    );

    res.send({
      status: 'ok',
      message:
        'Password changes properly. Your tokens are not valid. You must login again.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  updatePassword
};
