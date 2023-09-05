const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/test', controllers.getResponse);

module.exports = router;
