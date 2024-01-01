// Import the Note model
const Note = require("../models/note");

// route handler for retrieving all notes
exports.getAllNotes = async (req, res) => {
    try {
        // Retrieve all notes from the database
        const notes = await Note.find({});
        
        // Send a JSON response with the retrieved notes as an array
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// Define the route handler for retrieving a single note by ID
exports.getNoteById = async (req, res) => {
    try {
        // Extract the note ID from the request parameters
        const noteId = req.params.id;
        
        // Retrieve the note with the given ID from the database
        const note = await Note.findById(noteId);
        
        // If no note is found, return a 404 error
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }
        
        // Send a JSON response with the retrieved note
        res.status(200).json({
            success: true,
            data: note
        });
    } catch (err) {
        console.error(err);
        // If the error is because of an invalid object ID, send a 400 status code
        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: "Invalid note ID"
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}





