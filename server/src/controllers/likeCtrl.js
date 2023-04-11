const uniqid = require('uniqid');
const Pool = require("pg").Pool;

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
        await pool.query(`SELECT COUNT(*) FROM Likes WHERE photo_id = '${photo_id}'`, (err, result) => {
          res.status(200).json(result.rows);
        })
      },
    createLike: async (req, res) => {
      const { user_id } = req.body;
      const like_id = uniqid();
      const photo_id = req.params.id;
      await pool.query(`INSERT INTO Likes (like_id, photo_id, user_id)
                        VALUES('${like_id}', '${photo_id}', ${user_id})`, (err, result) => {
                          if (err) {
                            throw err;
                          }
                          res.status(200).send('photo liked successfully');
                        })
    },
}

module.exports = likeCtrl;