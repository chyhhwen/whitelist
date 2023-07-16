var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const jsonParser = bodyParser.json();


/* 設定API Router. */
router.post('/', jsonParser, (req, res, next) => {
    res.json(req.body);
});

module.exports = router;