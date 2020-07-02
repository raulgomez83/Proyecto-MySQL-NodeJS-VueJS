require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');
const { newUserSchema } = require('../../validations/user');
const { generateError, randomString, sendEmail } = require('../../helpers');

async function newUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    await newUserSchema.validateAsync(req.body);

    const {
      firstname,
      surname,
      email,
      birthdate,
      username,
      user_password
    } = req.body;

    const [
      existingUsername
    ] = await connection.query('SELECT user_id FROM users WHERE username=?', [
      username
    ]);
    if (existingUsername.length) {
      throw generateError(
        'This username already exists, please, try with another one',
        409
      );
    }
    const [
      existingEmail
    ] = await connection.query('SELECT user_id FROM users WHERE email=?', [
      email
    ]);

    if (existingEmail.length) {
      throw generateError('This email already exists in database', 409);
    }
    const dbPassword = await bcrypt.hash(user_password, 10);
    const registrationCode = randomString(40);
    const validationURL = `${process.env.PUBLIC_HOST}/users/validate?code=${registrationCode}`;

    try {
      await sendEmail({
        email: email,
        title: 'You must validate your account in the App in SQL',
        content: `For validate your account, click here:${validationURL} or paste this URL in your browser `
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error(
        'Sorry, there is  an error in the mailing. Try again later.'
      );
    }
    console.log(birthdate);

    await connection.query(
      `INSERT INTO users ( firstname, surname, email, birthdate, username, user_password, role, active, date_account_creation , date_password_modification,registrationcode )
      VALUES (?,?,?,?,?,?,"normal",false,NOW(),NOW(),?) `,
      [
        firstname,
        surname,
        email,
        birthdate,
        username,
        dbPassword,
        registrationCode
      ]
    );

    res.send({
      status: 'ok',
      message:
        'User created properly.Check your email for activate your account.'
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
  newUser
};
