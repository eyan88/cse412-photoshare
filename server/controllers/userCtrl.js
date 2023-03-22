const { response } = require('express');
const db = require('../db/queries');

const userCtrl = {
    getUsers: async (req, res) => {
        await db.getUsers(req,res);
    },
    createUsers: async (req, res) => {

    },
}

module.exports = userCtrl;