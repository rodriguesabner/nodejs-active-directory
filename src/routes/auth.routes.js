const router = require('express')();
const AdController = require('../controllers/ad.controller');
const AdMiddleware = require("../middleware/ad.middleware");

const adController = new AdController();

router.post('/login', AdMiddleware, adController.auth);

module.exports = router;
