const uniqid = require('uniqid');
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
        await pool.query('SELECT * FROM photo', (err, result) => {
          if (err) {
            throw err;
          }
          res.status(200).json(result.rows);
        })
    },
    createPost: async (req, res) => {

    },
}

module.exports = postCtrl;