// ---------------------------------------------------------------------------
// Dependencies

// Imports the router from express
const router = require('express').Router();

// Imports the methods from the user-controller
const userRoutes = require('./user-routes');
// Imports the methods from the thought-controller
const thoughtRoutes = require('./thought-routes');

// Sets up the routes for the users
router.use('/users', userRoutes);
// Sets up the routes for the thoughts
router.use('/thoughts', thoughtRoutes);

// Exports the router
module.exports = router;