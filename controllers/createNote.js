// Import the Note model
const Note = require("../models/note");

// route handler for creating a note
exports.createNote = async (req, res) => {
    try {
        // Extract title and content from request body
        const { title, content } = req.body;
        
        // Check if both title and content are provided in the request
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                data: "Bad Request",
                message: "Both 'title' and 'content' are required fields."
            });
        }
        
        // Create a new Note object and insert it into the database
        const newNote = await Note.create({ title, content });
        
        // Send a JSON response with a success flag
        res.status(201).json({
            success: true,
            data: newNote,
            title: newNote.title, 
            message: 'Note created successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
}
