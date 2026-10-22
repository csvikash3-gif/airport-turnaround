import { Router } from 'express';
import { getTurnaroundDashboardData, autoAllocateResources } from '../controllers/turnaround.controller';

const router = Router();

router.get('/turnarounds', getTurnaroundDashboardData);
router.post('/auto-allocate', autoAllocateResources);

export default router;