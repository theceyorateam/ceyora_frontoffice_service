import express, { Router } from 'express';
import {createVendor, getVendor} from '../controllers/vendor_controller';

const routes: Router = express.Router();

routes.post('/', createVendor);
routes.get('/', getVendor);
//routes.get('/:vendorId', getVendor);

export default routes;
