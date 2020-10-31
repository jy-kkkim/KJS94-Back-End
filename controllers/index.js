const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// const Visitor = require('./models/Visitor');
// const Mask = require('./models/Mask');
// const Temperature = require('./models/Temperature');
// const Humidity = require('./models/Humidity');
// const Noise = require('./models/Noise');
// const AirQuality = require('./models/AirQuality');

const VisitorController = require('./VisitorController');
const MaskController = require('./MaskController');
const TemperatureController = require('./TemperatureController');
const HumidityController = require('./HumidityController');
const NoiseController = require('./NoiseController');
const AirQualityController = require('./AirQualityController');

router.use('/visitors', VisitorController)
router.use('/mask', MaskController)
router.use('/temperature', TemperatureController)
router.use('/humidity', HumidityController)
router.use('/noise', NoiseController)
router.use('/airquality', AirQualityController)

module.exports = router;
