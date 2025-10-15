import express, { Router } from 'express';
import {createRegion, getRegion, getAllRegions} from "../controllers/region_controller";

const router: Router = express.Router();

router.post('', createRegion);
router.get('', getRegion);
router.get('/all', getAllRegions)

export default router;
