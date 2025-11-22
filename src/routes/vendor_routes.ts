// File: src/routes/vendor_routes.ts

import express, { Router } from 'express';
import {
    createVendor,
    getVendor,
    getVendorsByTheme,
    getAllVendors,
    getAvailableSlots // Imported new controller function
} from '../controllers/vendor_controller';

const routes: Router = express.Router();

routes.get('/all', getAllVendors);
routes.get('/by-theme', getVendorsByTheme);

// 🌟 ROUTE: GET /api/vendors/:vendorId/available-slots?date=YYYY-MM-DD
routes.get('/:vendorId/available-slots', getAvailableSlots);

// Existing general vendor routes
routes.get('/:vendorId', getVendor);
routes.post('/', createVendor);

console.log("Vendor routes loaded");

export default routes;