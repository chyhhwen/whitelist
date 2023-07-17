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
const sql = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});
router.get('/', function (req, res, next) {
  var check = false;
  var client_ip = getClientIp(req);
  sql.getConnection((error, connection) =>
  {
    if (!error)
    {
      connection.query( 'SELECT * FROM `list`',
          function (err, results, fields)
          {
            if (!error)
            {
              for(var i=0;i<results.length;i++)
              {
                const temp = JSON.parse(JSON.stringify(results[i]));
                if(temp["ip"] == client_ip)
                {
                  check = true;
                }
              }
              if(check === true)
              {
                res.render('error');
              }
              else
              {
                res.render('index');
              }
            }
          })
      sql.end(
          function (error)
          {
            if (error)
            {
              console.log("error")
            }
          });
    }
  });
});
router.get('/test', function (req, res, next) {
  res.redirect('/api/123/'+ '?127.0.0.1');
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