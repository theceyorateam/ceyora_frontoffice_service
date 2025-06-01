import express, { Router } from 'express';
import {createRegion, getRegion} from "../controllers/region_controller";

const router: Router = express.Router();

router.post('', createRegion);
router.get('', getRegion);

export default router;
