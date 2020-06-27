require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { loginSchema } = require('../../validations/login');
async function loginUser(req, res, next) {
  let connection;
  try {
    await loginSchema.validateAsync(req.body);
    const { username, password } = req.body;
    connection = await getConnection();
    const [
      dbUser
    ] = await connection.query(
      'SELECT user_id, email, user_password,username, role FROM users WHERE username=? AND active=true',
      [username]
    );
    if (!dbUser.length) {
      throw generateError(
        'No active user with this username. Remember validate it',
        404
      );
    }
    const [user] = dbUser;
    const passwordsMath = await bcrypt.compare(password, user.user_password);
    if (!passwordsMath) {
      throw generateError('Sorry, your password is wrong', 401);
    }
    const tokenPayload = {
      id: user.user_id,
      role: user.role,
      username: user.username
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: '30d'
    });
    res.send({
      status: 'ok',
      message: 'You are login',
      role: user.role,
      username: user.username,
      id: user.user_id,
      data: {
        token
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  loginUser
};
