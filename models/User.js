// -------------------------------------------------------
// Dependencies
const { Schema, model } = require('mongoose');

// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // regex to match a valid email address
        match: [/.+@.+\..+/]
    },
    // Array of _id values referencing the Thought model
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    // Array of _id values referencing the User model (self-reference)
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;