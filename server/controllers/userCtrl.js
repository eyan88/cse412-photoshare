const { response } = require('express');
const bcrypt = require('bcrypt');

// Unique IDs will be generated with this (not using SERIAL command for postgres)
// except for users table (dont want to restructure the entire table)
const uniqid = require('uniqid');

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
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
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
        const id = req.params.id;
        await pool.query(`SELECT * FROM users WHERE user_id = ${id}`, (err, result) => {
            if (err) {
                throw error;
            }
            res.status(200).json(result.rows);
        });
    },
    createUser: async (req, res) => {
        const { first_name, last_name, email, password, date_of_birth, hometown, gender } = req.body;

        const hash = await hashPassword(password);
        await pool.query(`INSERT INTO users(first_name, last_name, email, password, date_of_birth, hometown, gender, user_id)
        VALUES('${first_name}', '${last_name}', '${email}', '${hash}', '${date_of_birth}', '${hometown}', '${gender}', DEFAULT)`, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(201).json('user created successfully');
        });
    },
    deleteUser: async (req, res) => {
        const id = parseInt(req.params.id);

        await pool.query(`DELETE FROM users WHERE user_id = ${id}`, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).send('user deleted successfully');
        });
    },
}

module.exports = userCtrl;