const express = require('express');
const routes = express.Router();
const journeyController = require('../controllers/journey_controller')

routes.post('', journeyController.createJourney);
routes.get('', journeyController.getJourney);

module.exports =routes;