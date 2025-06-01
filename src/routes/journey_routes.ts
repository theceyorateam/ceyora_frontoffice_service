import express, { Router } from 'express';
import { createJourney, getJourney } from '../controllers/journey_controller';

const router: Router = express.Router();

router.post('', createJourney);
router.get('', getJourney);

export default router;
