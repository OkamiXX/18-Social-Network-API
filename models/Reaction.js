// -------------------------------------------------------
// Dependencies
const { Schema, model, Types } = require('mongoose');
// Require moment
const moment = require('moment');

// Reaction Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        // Set default value to the current timestamp
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    // Set the toJSON schema option to use virtuals
    toJSON: {
        getters: true
    },
    id: false
});

// Create the Reaction model using the reactionSchema
module.exports = reactionSchema;