// ---------------------------------------------------------------------------
// Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Set up Express App
const app = express();
// PORTS
const PORT = process.env.PORT || 3001;

// Set up Express App to use jason and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Requires the routes folder
app.use(require('./routes'));

// Mongoose Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB');

console.log('Connected to MongoDB');
        

// Use this to log mongo queries being executed
mongoose.set('debug', true);

// Start the server
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));