import Task from '../models/Task.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res, next) => {
    try {
        const { customerName, location, taskType, scheduledTime, notes } = req.body;

        // Validation
        if (!customerName || !location || !taskType || !scheduledTime) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }

        const task = await Task.create({
            customerName,
            location,
            taskType,
            scheduledTime,
            notes,
        });

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

// @desc    Get today's tasks
// @route   GET /api/tasks/today
// @access  Public
export const getTodayTasks = async (req, res, next) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const tasks = await Task.find({
            scheduledTime: { $gte: startOfDay, $lte: endOfDay },
        }).sort({ status: -1 }); // Pending first

        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// @desc    Mark task as complete
// @route   PATCH /api/tasks/:id/complete
// @access  Public
export const completeTask = async (req, res, next) => {
    try {
        const { completedAt } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        task.status = 'Completed';
        task.completedAt = completedAt || new Date();

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
};
