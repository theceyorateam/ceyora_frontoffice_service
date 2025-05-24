const express = require('express');
const routes = express.Router();
const regionController = require('../controllers/region_controller')

routes.post('', regionController.createRegion);
routes.get('', regionController.getRegion);

module.exports =routes;