var express = require('express');
var router = express.Router();
/* 引入 Controller */
const todoController = require('../controllers/todo');
const {request, response} = require("express");

/* 設定Web Router. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/searchList', (req, res) => {
  res.send(req.body);
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
router.get('/todos', todoController.getAll);

router.get('/test', todoController.getDB);

module.exports = router;