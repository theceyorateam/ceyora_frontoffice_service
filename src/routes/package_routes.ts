import { Router } from 'express';
import * as packageController from '../controllers/package_controller';

const routes = Router();

routes.post('', packageController.createPackage);
routes.get('', packageController.getPackage);

export default routes;
