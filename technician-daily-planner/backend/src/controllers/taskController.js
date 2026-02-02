import Task from '../models/Task.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res) => {
    try {
        const { customerName, location, taskType, scheduledTime, notes } = req.body;

        // Validation
        if (!customerName || !location || !taskType || !scheduledTime) {
            return res.status(400).json({ message: 'Please provide all required fields' });
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
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get today's tasks
// @route   GET /api/tasks/today
// @access  Public
export const getTodayTasks = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const tasks = await Task.find({
            scheduledTime: { $gte: startOfDay, $lte: endOfDay },
        }).sort({ status: -1 }); // Pending first (if "Pending" > "Completed"? P > C, so -1 is P then C. Yes.)

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
