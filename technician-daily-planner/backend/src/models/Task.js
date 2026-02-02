import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    taskType: {
        type: String,
        enum: ['Installation', 'Repair', 'Maintenance', 'Inspection'],
        required: true,
    },
    scheduledTime: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
    },
    completedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
