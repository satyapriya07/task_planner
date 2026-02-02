import express from 'express';
import { createTask, getTodayTasks } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/today', getTodayTasks);

export default router;
