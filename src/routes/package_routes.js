const express = require('express');
const routes = express.Router();
const packageController = require('../controllers/package_controller')

routes.post('', packageController.createPackage);
routes.get('', packageController.getPackage);

module.exports =routes;