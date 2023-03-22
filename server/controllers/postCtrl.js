const { response } = require('express');
const db = require('../db/queries');

const postCtrl = {
    getPosts: async (req, res) => {
        console.log('getting posts');
    },
    createNote: async (req, res) => {

    },
}

module.exports = postCtrl;