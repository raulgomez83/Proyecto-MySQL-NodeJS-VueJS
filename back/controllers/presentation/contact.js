require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError, sendEmail } = require('../../helpers');

async function getContact(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const { message } = req.body;
    const [
      result
    ] = await connection.query(
      `SELECT p.presentation_id, p.user_id, u.email FROM presentations p INNER JOIN users u ON p.user_id = u.user_id WHERE presentation_id=?`,
      [id]
    );
    try {
      const [
        contactEmail
      ] = await connection.query('SELECT email FROM  users WHERE user_id=?', [
        req.auth.id
      ]);
      await sendEmail({
        email: result[0].email,
        title: `Another user is interested to contact you, the message is:`,
        content: `${message}. 
               If you are interested to contact him, the user's email is ${contactEmail[0].email}`
      });
    } catch (error) {
      console.error(error);
      throw generateError('It is a problem sending your mail ');
    }
    res.send({
      status: 'ok',
      data: `Another user wants to contact you , please, check your email`
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getContact
};
