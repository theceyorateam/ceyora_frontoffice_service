import express, { Router } from 'express';
import { createJourney, getJourney, getAllJourneys } from '../controllers/journey_controller';

const router: Router = express.Router();

router.post('', createJourney);
router.get('/:journeyId', getJourney);

export default router;
