const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "photoshare",
  password: "darkmagic10",
  port: 5432,
});

// USER QUERIES
const getUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
};




















module.exports = {
    getUsers,
}
