// Import the Note model
const Note = require("../models/note");

// route handler for Updating a note by ID
exports.updateNote = async (req, res) => {
    try {
        // Extract the note ID from the request parameters
        const noteId = req.params.id;
        // Extract the updated data from the request body
        const updateData = req.body;

        // Find the note by ID and update it with the new data
        // { new: true } option returns the updated object
        const note = await Note.findByIdAndUpdate(noteId, updateData, { new: true, runValidators: true });

        // If no note is found, return a 404 error
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        // Send a JSON response with the updated note
        res.status(200).json({
            success: true,
            data: note,
            message: 'Note updated successfully'
        });
    } catch (err) {
        console.error(err);
        // If the error is because of an invalid object ID, send a 400 status code
        if (err.kind === 'ObjectId') {
            return res.status(200).json({
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
