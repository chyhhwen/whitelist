var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res, next) => {
    res.json({ip: "127.0.0.1"});

});
router.get('/', jsonParser, (req, res, next) => {
    res.json({ip: "127.0.0.1"});
});
module.exports = router;