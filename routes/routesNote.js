const express = require('express');
// Create a router instance
const router = express.Router();

// Import controller functions
const { createNote } = require('../controllers/createNote');
const { getAllNotes, getNoteById } = require('../controllers/retrieveNote');
const { updateNote } = require('../controllers/updateNote');
const { deleteNote } = require('../controllers/deleteNote');

// Route to create a new note
router.post('/notes', createNote); 

// Route to retrieve all notes
router.get('/notes', getAllNotes); 

// Route to retrieve a single note by id
router.get('/notes/:id', getNoteById); 

// Route to update a note by id
router.put('/notes/:id', updateNote); 

// Route to delete a note by id
router.delete('/notes/:id', deleteNote); 

// Export the router
module.exports = router;
