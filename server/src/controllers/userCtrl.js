const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Unique IDs will be generated with this (for album and photos) (not using SERIAL command for postgres)
// except for users table (dont want to restructure the entire table)
const uniqid = require("uniqid");
const TOKEN = 'privatekey';

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "photoshare",
  password: "password",
  port: 5432,
});

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// TODO: add update user function to update user credentials and information
const userCtrl = {
  getUsers: async (req, res) => {
    await pool.query("SELECT * FROM users", (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    });
  },
  getUserById: async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query(
      `SELECT * FROM users WHERE user_id = ${id}`,
      (err, result) => {
        if (err) {
          throw error;
        }
        res.status(200).json(result.rows);
      }
    );
  },
  createUser: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        hometown,
        gender,
      } = req.body;
      const hash = await hashPassword(password);
      await pool.query(
        `INSERT INTO users(first_name, last_name, email, password, date_of_birth, hometown, gender, user_id)
          VALUES('${first_name}', '${last_name}', '${email}', '${hash}', '${date_of_birth}', '${hometown}', '${gender}', DEFAULT)`,
        (err, result) => {
          if (err) {
            return res.status(400).json("email already exists");
          }

          return res.status(201).json("user created successfully");
        }
      );
    } catch(err) {
      return res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      await pool.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        async (err, result) => {
          // check if email exists
          if(result.rows.length === 0) {
            return res.status(400).json('email not found. please check your credentials or register a new account');
          }

          // email found, check password
          const userPassword = result.rows[0].password
          const match = await bcrypt.compare(password, userPassword);
          if (!match) {
            return res.status(400).json('invalid password');
          }
          
          // send back unique token
          const payload = { user_id: result.rows[0].user_id, name: result.rows[0].name };
          const token = jwt.sign(payload, TOKEN, {
            expiresIn: '1d',
          });
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    const id = parseInt(req.params.id);

    await pool.query(
      `DELETE FROM users WHERE user_id = ${id}`,
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).send("user deleted successfully");
      }
    );
  },
};

module.exports = userCtrl;
