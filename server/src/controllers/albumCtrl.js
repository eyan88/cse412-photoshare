const uniqid = require("uniqid");
const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "photoshare",
  password: "password",
  port: 5432,
});

const albumCtrl = {
  getAllAlbums: async (req, res) => {
    await pool.query("SELECT * FROM album", (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    });
  },
  getAlbumById: async (req, res) => {
    const album_id = req.params.id;
    await pool.query(
      `SELECT * FROM album WHERE album_id = '${album_id}'`,
      (err, result) => {
        res.status(200).json(result.rows);
      }
    );
  },
  getAlbumsByUserId: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "privatekey");
    const user_id = decodedToken.user_id;

    await pool.query(
      `SELECT * FROM album WHERE user_id = ${user_id}`,
      (err, result) => {
        res.status(200).json(result.rows);
      }
    );
  },
  createAlbum: async (req, res) => {
    const { album_name } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "privatekey");
    const user_id = decodedToken.user_id;

    const dateToday = new Date();

    const album_id = uniqid();
    await pool.query(
      `INSERT INTO album(album_id, album_name, user_id, date_of_album)
      VALUES('${album_id}', '${album_name}', '${user_id}', '${dateToday.toISOString()}')`,
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).send({ msg: "album added successfully" });
      }
    );
  },
  deleteAlbum: async (req, res) => {
    const album_id = req.params.id;

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "privatekey");
    const user_id = decodedToken.user_id;

    await pool.query(
      `DELETE FROM album WHERE album_id='${album_id}' AND user_id=${user_id}`,
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ msg: "album deleted successfully" });
      }
    );
  },
};

module.exports = albumCtrl;
