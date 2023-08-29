// ---------------------------------------------------------------------------
// Dependencies

// Imports the router from express
const router = require('express').Router();

// Imports the methods from the thought-controller
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Sets up the routes for the thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// Sets up the routes for the thoughts by id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// Sets up the routes for the reactions
router.route('/:thoughtId/reactions/')
    .post(addReaction)
    .delete(deleteReaction)

// Exports the router
module.exports = router;