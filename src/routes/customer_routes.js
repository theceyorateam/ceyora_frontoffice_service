const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer_controller')


router.post('', customerController.createUser);
router.get('', customerController.getUser);

module.exports = router;