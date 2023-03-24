const { response } = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "photoshare",
  password: "password",
  port: 5432,
});

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
        const id = req.params.id;
        await pool.query(`SELECT * FROM users WHERE user_id = ${id}`, (err, result) => {
            if (err) {
                throw error;
            }
            res.status(200).json(result.rows);
        });
    },
    createUser: async (req, res) => {
        const { user_id, first_name, last_name, email, password, date_of_birth, hometown, gender } = req.body;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                throw err;
            }
            pool.query(`INSERT INTO users(user_id, first_name, last_name, email, password, date_of_birth, hometown, gender)
            VALUES(${user_id}, '${first_name}', '${last_name}', '${email}', '${hash}', '${date_of_birth}', '${hometown}', '${gender}')`, (err, result) => {
                if (err) {
                    throw err;
                }
                res.status(201).json('user created successfully');
            });
        });
    },
    deleteUser: async (req, res) => {
        const id = parseInt(req.params.id);

        pool.query(`DELETE FROM users WHERE user_id = ${id}`, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).send('user deleted successfully');
        });
    },
}

module.exports = userCtrl;