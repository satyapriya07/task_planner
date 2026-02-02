import express from 'express';
import { createTask, getTodayTasks, completeTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/today', getTodayTasks);
router.patch('/:id/complete', completeTask);

export default router;
