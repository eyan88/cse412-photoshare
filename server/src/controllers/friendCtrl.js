// Unique IDs will be generated with this (not using SERIAL command for postgres)
// except for users table (dont want to restructure the entire table)
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

const friendCtrl = {
  getFriendsOfUserId: async (req, res) => {
    //const id = parseInt(req.params.id);

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "privatekey");
    const user_id = decodedToken.user_id;

    await pool.query(
      `SELECT * FROM friendship WHERE user_id = ${user_id}`,
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json(result.rows);
      }
    );
  },
  createFriendship: async (req, res) => {
    const { friend_id } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "privatekey");
    const user_id = decodedToken.user_id;

    const dateToday = new Date();
    await pool.query(
      `INSERT INTO friendship (friendship_id, user_id, friend_of_user, date_of_friendship)
        VALUES ('${uniqid()}', '${user_id}', '${friend_id}', '${dateToday.toISOString()}')`,
      (err, result) => {
        if (err) {
          res.status(400).send({ msg: "you have already added this user as a friend"})
        } else {
          res.status(200).send({ msg: "friendship added succesfully" });
        }
      }
    );
  },
};

module.exports = friendCtrl;
