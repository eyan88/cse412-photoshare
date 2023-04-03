const uniqid = require("uniqid");
const Pool = require("pg").Pool;

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
    const { caption, date_of_photo, user_id, album_id, image_path } = req.body;
    const photo_id = uniqid();
    await pool.query(
      `INSERT INTO photo(photo_id, caption, date_of_photo, user_id, album_id, image_path)
      VALUES('${photo_id}', '${caption}', '${date_of_photo}', ${user_id}, ${album_id}, '${image_path}')`,
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).send("photo added successfully");
      }
    );
  },
};

module.exports = postCtrl;
