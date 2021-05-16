var express = require('express');
var router = express.Router();


var chartview = require('../views/chartview');
router.get('/chart', chartview.renderChart);
module.exports = router;
