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

const postCtrl = {
  getAllPosts: async (req, res) => {
    await pool.query("SELECT * FROM photo", (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    });
  },
  getPostById: async (req, res) => {
    const photo_id = req.params.id;
    await pool.query(
      `SELECT * FROM photo WHERE photo_id = '${photo_id}'`,
      (err, result) => {
        res.status(200).json(result.rows);
      }
    );
  },
  getPostsByUserId: async (req, res) => {
    const user_id = parseInt(req.params.id);
    await pool.query(
      `SELECT * FROM photo WHERE user_id = ${user_id}`,
      (err, result) => {
        res.status(200).json(result.rows);
      }
    );
  },
  createPost: async (req, res) => {
    const { caption, date_of_photo } = req.body;
    const file = req.file;

    // grab userID from authorization token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "privatekey");
    const user_id = decodedToken.user_id;

    // format date as date object to convert to ISO string
    const dateFormatted = new Date(date_of_photo);

    // generate photoid
    const photo_id = uniqid();
    const album_id = null;

    await pool.query(
      `INSERT INTO photo(photo_id, caption, date_of_photo, user_id, album_id, image_path)
      VALUES('${photo_id}', '${caption}', '${dateFormatted.toISOString()}', ${user_id}, ${album_id}, '${
        file.path
      }')`,
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ msg: "photo added successfully" });
      }
    );
  },
  deletePost: async (req, res) => {
    const photo_id = req.params.id;

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "privatekey");
    const user_id = decodedToken.user_id;

    await pool.query(
      `DELETE FROM photo WHERE photo_id='${photo_id}' AND user_id=${user_id}`,
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ msg: "photo deleted successfully" });
      }
    );
  },
};

module.exports = postCtrl;
