// --------------------------------------------------------------------------
// Import the required modules

// Import the User, Thought, and Reaction models
const { User, Thought, Reaction } = require('../models');

// Create the thoughtController object to then export to routes for easier readability/use
const thoughtController = {

    // GET /api/thoughts
    getAllThoughts(req, res) {
        Thought.find({}).populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // GET /api/thoughts/:id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id }).populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                // If no errors, send it back
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST /api/thoughts
    // expected body should include all of the following attributes:
    // {
    //     "thoughtText": "wow",
    //     "username": "user",  
    //     "userId": "123"
    // }
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'No user found with this id' });
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    // PUT /api/thoughts/:id
    // expected body should include at least one of the following attributes:
    // {
    //     "thoughtText": "wow",
    //     "username": "user", 
    //     "userId": "123"  
    // }
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
            // 
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                // If no errors, send it back
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },


    // DELETE /api/thoughts/:id
    deleteThought({ params }, res) {
        // delete the thought
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                // Delete the reference to deleted thought
                User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: params.id } }
                )
                    .then(() => {
                        res.json({ message: 'Successfully deleted the thought' });
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    },

    // POST /api/thoughts/:id/reactions
    // add a reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    // DELETE /api/thoughts/:id/reactions
    // expected body should include minimum of one of the following attributes:
    // {
    //     "reactionId": "123"  // Must be a reactionId with the specified Thought instance
    // }
    deleteReaction({ params, body }, res) {
        // delete the reaction
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true, runValidators: true }
        )
            // 
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json({ message: 'Successfully deleted the reaction' });
            })
            .catch(err => res.status(500).json(err));
    },
}

// Export the thoughtController object
module.exports = thoughtController;