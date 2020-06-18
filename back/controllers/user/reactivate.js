require('dotenv').config();

const bcrypt = require('bcrypt');
const {
  reactivateSchema
} = require('../../validations/reactivate_user-recovery_password');
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function reactivateUser(req, res, next) {
  let connection;

  try {
    await reactivateSchema.validateAsync(req.body);

    const { username, password } = req.body;
    console.log(req.body);
    connection = await getConnection();
    const [
      dbUser
    ] = await connection.query(
      'SELECT user_id, username, user_password FROM users WHERE username=? AND active=0 AND registrationcode IS NULL',
      [username]
    );

    if (!dbUser.length) {
      throw generateError(
        'No exists any unactivate account with this username',
        404
      );
    }
    const [user] = dbUser;
    const passwordsMath = await bcrypt.compare(password, user.user_password);
    if (!passwordsMath) {
      throw generateError('Sorry, your password is wrong', 401);
    }
    await connection.query(
      `UPDATE users SET active=true WHERE user_id=?
`,
      [user.user_id]
    );
    res.send({
      status: 'ok',
      message: 'The reactivation is done.Please, Login again'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  reactivateUser
};
