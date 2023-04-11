const uniqid = require("uniqid");
const Pool = require("pg").Pool;

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
    const user_id = parseInt(req.params.id);
    await pool.query(
      `SELECT * FROM album WHERE user_id = ${user_id}`,
      (err, result) => {
        res.status(200).json(result.rows);
      }
    );
  },
  createAlbum: async (req, res) => {
    const { album_name, user_id, date_of_album } = req.body;
    const album_id = uniqid();
    await pool.query(
      `INSERT INTO album(album_id, album_name, user_id, date_of_album)
      VALUES('${album_id}', '${album_name}', '${user_id}', '${date_of_album}')`,
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).send("album added successfully");
      }
    );
  },
};

module.exports = albumCtrl;
