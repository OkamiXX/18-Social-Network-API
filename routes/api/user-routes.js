// ---------------------------------------------------------------------------
// Dependencies

// Imports the router from express
const router = require('express').Router();
// Imports the methods from the user-controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Sets up the routes for the users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// Sets up the routes for the users by id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// Sets up the routes for the friends
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

// Exports the router
module.exports = router;