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
