const express = require('express');
const pool = require('./config/PrimaryDbConfigs');
require('dotenv').config();
const userRoutes = require('./routes/customer_routes');
const vendorRoutes = require('./routes/vendor_routes');
const packageRoutes = require('./routes/package_routes');


const app = express();
app.use(express.json());


app.use('/customer', userRoutes);
app.use('/vendor', vendorRoutes);
app.use('/package', packageRoutes);
app.use('/journey', packageRoutes);

// app.get('/', (req, res) => res.send('App is running'));

module.exports = app;
