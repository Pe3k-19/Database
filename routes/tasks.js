const express = require('express');
const pool = require('../connection');


const Router = express.Router();

Router.get('/', (req, res) => {
    pool.query('SELECT * FROM ulohy', (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log('nenacitane data');
        }
    })
});

module.exports = Router;

