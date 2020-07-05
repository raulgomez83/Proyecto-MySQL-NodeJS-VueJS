require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function validateUser(req, res, next) {
  let connection;

  try {
    const { code } = req.query;
    connection = await getConnection();
    const [
      result
    ] = await connection.query(
      'UPDATE users SET active=true,registrationcode=NULL WHERE registrationcode=?',
      [code]
    );
    if (result.affectedRows === 0) {
      throw generateError('Wrong validation', 400);
    }
    res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style= "text-align:center">
  <div style="background:rebeccapurple; color:gold; font-size:3rem;">
    <h1>CONGRATULATIONS!!!</h1>
    <h2>Your user is validated, now you can login.</h2>
    </div>
  </body>
</html>
`);
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  validateUser
};
