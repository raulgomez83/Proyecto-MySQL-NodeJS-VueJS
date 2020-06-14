require('dotenv').config();
const {
  getConnection
} = require('../../db');
const {
  generateError,
  search
} = require('../../helpers');

async function getSearchPresentationsSpecial(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const {
      query,
      params
    } = search(req.query)
    const result = await connection.query(query, params)

    const [presentationData] = result;
    if (!presentationData.length) {
      throw generateError('Presentation list is empty', 401);
    }
    res.send({
      staus: 'ok',
      data: presentationData
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getSearchPresentationsSpecial
};