import { Router } from 'express';
import { createTheme, getTheme, getAllThemes } from '../controllers/theme_controller';

const routes = Router();

routes.post('/', createTheme);
routes.get('/:id', getTheme);      // GET /theme/:id
routes.get('/', getAllThemes);     // GET /theme/

export default routes;
