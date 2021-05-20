const express = require('express');
const router = express.Router();

const chartview = require('../views/chartview');
router.get('/chart', chartview.renderChart);
const badgeview = require('../views/badgeview');
router.get('/badge', badgeview.renderBadge);
const fitcardview = require('../views/fitcardview');
router.get('/fit', fitcardview.renderFitCard);
const calendarview = require('../views/calendarview');
router.get('/calendar', calendarview.rendercalendarCard);

module.exports = router;