var express = require('express');
var router = express.Router();
const { curly } = require("node-libcurl");

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
router.get('/', async (req, res, next) =>{
  var check = false;
  var client_ip = getClientIp(req);
  const { statusCode, data, headers } = await curly.get('http://localhost:3000/api/list', {
    httpHeader: [
      'Content-Type: application/json',
      'Accept: application/json'
    ],
  })
  for(var i=0;i<data.length;i++)
  {
    if(client_ip === data[i]["ip"])
    {
      check = true;
    }
  }
  if(check)
  {
    res.render("error");
  }
  else
  {
    res.render("index");
  }
});
router.get('/test', async (req, res, next) =>  {

  res.render('index');
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