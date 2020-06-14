require('dotenv').config();

const { getConnection } = require('../../db');

async function viewPresentation(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const id = req.params.id;
    const [
      result
    ] = await connection.query(
      `SELECT presentation_id_views ,total_views FROM views WHERE presentation_id_views=?`,
      [id]
    );
    if (!result.length) {
      await connection.query(
        `INSERT INTO views (date_lastview, presentation_id_views)VALUES(NOW(),?)`,
        [id]
      );
    } else {
      const newCount = result[0].total_views + 1;
      await connection.query(
        `UPDATE views SET date_lastview=NOW(),total_views=? WHERE  presentation_id_views=? `,
        [newCount, id]
      );
    }

    res.send({
      status: 'ok',
      message: 'Video is watched'
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
  viewPresentation
};
