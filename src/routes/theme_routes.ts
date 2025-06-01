import express, { Router } from 'express';
import {createTheme, getTheme} from '../controllers/theme_controller';

const routes: Router = express.Router();

routes.post('/', createTheme);
routes.get('/', getTheme);

export default routes;
