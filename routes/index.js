// ---------------------------------------------------------------------------
// Dependencies

// Imports the router from express
const router = require('express').Router();
// Imports the methods from the api folder
const apiRoutes = require('./api/');

// Sets up the routes for the api
router.use('/api', apiRoutes);

// Sets up the routes for the homepage if any errors occur (wrong request, etc.)
router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
})

// Exports the router
module.exports = router;