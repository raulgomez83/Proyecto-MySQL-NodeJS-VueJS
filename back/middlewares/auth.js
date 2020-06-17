require('dotenv').config();
const jwt = require('jsonwebtoken');

const { getConnection } = require('../db');
const { generateError } = require('../helpers');

async function userIsAuthenticated(req, res, next) {
  let connection;

  try {
    // Check if the authorization header is valid
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError(' Authorization header is missed', 402);
    }

    const authorizationParts = authorization.split(' ');

    let token;

    if (authorizationParts.length === 1) {
      token = authorization;
    } else if (authorizationParts[0] === 'Bearer') {
      token = authorizationParts[1];
    } else {
      throw generateError('Is not posible read the token');
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error('Token is not well created');
    }

    const { id, iat } = decoded;

    connection = await getConnection();

    const [
      result
    ] = await connection.query(
      'SELECT date_password_modification FROM users WHERE user_id=?',
      [id]
    );

    if (!result.length) {
      generateError('User does not exist in database', 400);
    }

    const [user] = result;

    if (new Date(iat * 1000) < new Date(user.date_password_modification)) {
      generateError('Token is not valid, Login again', 401);
    }

    req.auth = decoded;
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

function userIsAdmin(req, res, next) {
  if (req.auth.role !== 'admin') {
    const error = generateError('You do not privileges of administration', 401);

    return next(error);
  }

  next();
}

module.exports = {
  userIsAuthenticated,
  userIsAdmin
};
