// --------------------------------------------------------------------------
// Import the required modules

// Import the User and Thought models
const { User, Thought } = require('../models');

// Create the userController object to then export to routes for easier readability/use
const userController = {

    // GET /api/users
    getAllUsers(req, res) {
        // get all users
        User.find({})
            // select -__v to not return the __v field
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // GET /api/users/:id
    getUserById({ params }, res) {
        // get a single user by its _id and populate thought and friend data
        User.findOne({ _id: params.id }).populate([
            { path: 'thoughts', select: "-__v" },
            { path: 'friends', select: "-__v" }
        ])
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                // If no errors, send it back
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST /api/users
    // expected:
    // {
    //     "username": "pepe",
    //     "email": "pepe@pepmail.com" 
    // }

    // Create a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // PUT /api/users/:id
    // expected body must include a minimum of one of these attributes:
    // {
    //     "username": "pepe",
    //     "email": "pepe@pepmail.com"
    // }

    // Update a user by its _id
    updateUser({ params, body }, res) {
        // update a user by its _id value
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                // If no errors, send it back
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE /api/users/:id
    deleteUser({ params }, res) {
        // Delete the user by its _id value
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                // Remove the user from any friends arrays in other users
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        // remove any comments from this user
                        Thought.deleteMany({ username: dbUserData.username })
                            .then(() => {
                                res.json({ message: "Successfully deleted user" });
                            })
                            .catch(err => res.status(400).json(err));
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    // POST /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        // Add friendId to userId's friend list 
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this userId' });
                    return;
                }
                // Add userId to friendId's friend list
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $addToSet: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                    .then(dbUserData2 => {
                        if (!dbUserData2) {
                            res.status(404).json({ message: 'No user found with this friendId' })
                            return;
                        }
                        // If no errors, send it back
                        res.json(dbUserData);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    },

    // DELETE /api/users/:userId/friends/:friendId
    deleteFriend({ params }, res) {
        // Remove friendId from userId's friend list
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                // If no user found with this userId
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this userId' });
                    return;
                }
                // Rremove userId from friendId's friend list
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $pull: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                // If no user found with this friendId
                    .then(dbUserData2 => {
                        if (!dbUserData2) {
                            res.status(404).json({ message: 'No user found with this friendId' })
                            return;
                        }
                        // If no errors, send it back
                        res.json({ message: 'Successfully deleted the friend' });
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    }
}

// Export the userController object
module.exports = userController;