import express, { Router } from 'express';
import {createTheme, getTheme, getAllThemes} from '../controllers/theme_controller';

const routes: Router = express.Router();

routes.post('/', createTheme);
routes.get('/', getTheme);
routes.get('/all', getAllThemes)

export default routes;
