const express = require('express');
const router = express.Router();
const MovieRoute = require('./movieRoute.js');
const ProdHouseRoute = require('./prodHouseRoute.js');
const CastRoute = require('./castRoute.js');

router.use('/movies', MovieRoute);
router.use('/production-houses', ProdHouseRoute);
router.use('/casts', CastRoute);

module.exports = router