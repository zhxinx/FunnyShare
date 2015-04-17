var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('frame', {});
});

module.exports = router;