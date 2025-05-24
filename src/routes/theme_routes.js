const express = require('express');
const routes = express.Router();
const themeController = require('../controllers/theme_controller')

routes.post('', themeController.createTheme);
routes.get('', themeController.getTheme);

module.exports =routes;