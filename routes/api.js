var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mysql = require('mysql');

const sql = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});
router.post('/', jsonParser, (req, res, next) => {
    res.json({ip: "127.0.0.1"});

});
router.get('/', jsonParser, (req, res, next) => {
    res.json({ip: "127.0.0.1"});
});
router.get('/list', jsonParser, (req, res, next) => {
    var temp;
    sql.getConnection((error, connection) => {
        if (!error) {
            connection.query('SELECT * FROM `list`',
                function (err, results, fields)
                {
                    if (!error)
                    {
                        temp = JSON.parse(JSON.stringify(results));
                    }
                })
            sql.end(
                function (error) {
                    if (error) {
                        process.exit();
                    }
                    else
                    {
                        res.json(temp);
                    }
                });
        }
    });
});
router.get('/test', jsonParser, (req, res, next) => {

});
module.exports = router;