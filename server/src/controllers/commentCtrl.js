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

const commentCtrl = {
  getAllComments: async (req, res) => {
    await pool.query("SELECT * FROM comment", (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    });
  },
  getCommentsOnPost: async (req, res) => {
    const photo_id = req.params.id;
    await pool.query(
      `SELECT * FROM comment WHERE photo_id = '${photo_id}'`,
      (err, result) => {
        res.status(200).json(result.rows);
      }
    );
  },
  createComment: async (req, res) => {
    const { photo_id, comment_text, date_of_comment } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "privatekey");
    const user_id = decodedToken.user_id;

    const comment_id = uniqid();
    await pool.query(
      `INSERT INTO comment(comment_id, photo_id, user_id, comment_text, date_of_comment)
      VALUES('${comment_id}', '${photo_id}', ${user_id}, '${comment_text}', '${date_of_comment}')`,
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).send("comment added successfully");
      }
    );
  },
};

module.exports = commentCtrl;
