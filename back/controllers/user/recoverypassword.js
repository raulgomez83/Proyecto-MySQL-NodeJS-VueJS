require('dotenv').config();
const bcrypt = require('bcrypt');

const { sendEmail, generateError, randomString } = require('../../helpers.js');
const { getConnection } = require('../../db');
const {
  recoveryPasswordSchema
} = require('../../validations/reactivate_user-recovery_password');

async function recoveryPassword(req, res, next) {
  let connection;
  try {
    await recoveryPasswordSchema.validateAsync(req.body);
    const { email } = req.body;
    connection = await getConnection();
    const [
      dbUser
    ] = await connection.query(
      'SELECT user_id, email, user_password FROM users WHERE email=? and active=true',
      [email]
    );
    if (!dbUser.length) {
      throw generateError('There is not an active users with this email', 404);
    }
    const [user] = dbUser;
    const tempPassword = randomString(10);
    try {
      await sendEmail({
        email: user.email,
        title: 'This is your new temporally password',
        content: `Your new password is ${tempPassword}. By save, change it after login`
      });
    } catch (error) {
      console.error(error);
      throw generateError('It is a problem with the mail sending');
    }
    const tempDBPassword = await bcrypt.hash(tempPassword, 10);
    await connection.query('UPDATE users SET user_password=? WHERE user_id=?', [
      tempDBPassword,
      user.user_id
    ]);
    res.send({
      staus: 'ok',
      message:
        'Your password is recovey. We send you an email with your new password. Check your spam folder.'
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
  recoveryPassword
};
