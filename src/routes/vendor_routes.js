const express = require('express');
const routes = express.Router();
const vendorController = require('../controllers/vendor_controller')

routes.post('', vendorController.createVendor);
routes.get('', vendorController.getVendor);

module.exports =routes;