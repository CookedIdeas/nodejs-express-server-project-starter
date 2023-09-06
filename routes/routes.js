const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/test', controllers.testGetRoute);

module.exports = router;
