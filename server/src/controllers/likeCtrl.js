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

const likeCtrl = {
  getLikesByPhotoId: async (req, res) => {
    const photo_id = req.params.id;
    await pool.query(
      `SELECT COUNT(*) FROM Likes WHERE photo_id = '${photo_id}'`,
      (err, result) => {
        res.status(200).json(result.rows);
      }
    );
  },
  createLike: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "privatekey");
    const user_id = decodedToken.user_id;

    const like_id = uniqid();
    const photo_id = req.params.id;
    await pool.query(
      `INSERT INTO Likes (like_id, photo_id, user_id)
                        VALUES('${like_id}', '${photo_id}', ${user_id})`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("you already liked this photo");
        } else {
          res.status(200).send("photo liked successfully");
        }
      }
    );
  },
};

module.exports = likeCtrl;
