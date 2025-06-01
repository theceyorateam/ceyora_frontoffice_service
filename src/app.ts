import express, { Application } from 'express';
import dotenv from 'dotenv';
import pool from './config/PrimaryDbConfigs';
import userRoutes from './routes/customer_routes';
import vendorRoutes from './routes/vendor_routes';
import packageRoutes from './routes/package_routes';
import themeRoutes from './routes/theme_routes';
import journeyRoutes from './routes/journey_routes';
import regionRoutes from './routes/region_routes'

dotenv.config();

const app: Application = express();
app.use(express.json());

app.use('/customer', userRoutes);
app.use('/vendor', vendorRoutes);
app.use('/package', packageRoutes);
app.use('/journey', journeyRoutes);
app.use('/theme', themeRoutes);
app.use('/region', regionRoutes);


export default app;
