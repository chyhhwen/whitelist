var express = require('express');
var router = express.Router();

const {request, response} = require("express");
const http = require('http');
function getClientIp(req) {
  var ip = req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
  if(ip.split(',').length>0){
    ip = ip.split(',')[0]
  }
  console.log(ip);
  return ip;
};
const mysql = require('mysql');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});
router.get('/', function (req, res, next) {
  /*console.log(getClientIp(req));
  res.render('index');*/
  sql.getConnection((error, connection) =>
  {
    if (error)
    {
      console.log("error");
    }
    else
    {
      connection.query( 'SELECT * FROM `memo`',
          function (err, results, fields)
          {
            if (error)
            {
              console.log("error");
            }
            for (i = 0; i < results.length; i++)
            {
              console.log(JSON.stringify(results[i]));
            }
          })
      sql.end(
          function (error)
          {
            if (error)
            {
              console.log(error)
            }
          });
    }
  });
});

router.post('/check-login', (req, res) => {
  var user = req.body.username;
  var pass = req.body.password;
  if(user == '123' && pass == '456')
  {
    res.redirect('/pass');
  }
  else
  {
    res.redirect('/');
  }
});

module.exports = router;