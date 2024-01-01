const Note = require('../models/note');

// route handler for deleting note
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
            data: note 
        });
    } catch (err) {
        console.error("Error deleting note:", err); // Log the error
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
