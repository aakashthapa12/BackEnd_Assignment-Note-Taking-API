const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxLength: [50, 'Title cannot be more than 50 characters'],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            maxLength: [1000, 'Content cannot be more than 1000 characters'],
        }
    }, 
    {
        timestamps: true // Mongoose uses this option to automatically add `createdAt` and `updatedAt` fields
    }
);

module.exports = mongoose.model('Note', noteSchema);
