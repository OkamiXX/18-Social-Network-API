# 18-Social-Network-API 📲

## Description🧘🏻
A REST API for a social network application. Built with Express and MongoDB (mongoose).

## Purpose ✪
    The purpose of this app is to demonstrate the usage of MongoDB and the npm package called mongoose. It is done by creating different models(Schemas), routes and controllers of a social network app. The user will be able to :
* Create a new User
* Create a new Thought
* React to other users Thoughts.
* Add Friends
* Be able to delete Users, Thoughts, Friends and Reactions.

## User Story🎯
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria🦉
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```



## Routes🪧
**User-Routes**🧔‍♂️
- Get all users:        `GET /api/users`
- Create user:          `POST /api/users`
- Get user by ID:       `GET /api/users/:id`
- Update user:          `PUT /api/users/:id`
- Delete user:          `DELETE /api/users/:id`
- Add friend:           `POST /api/users/:userId/friends/:friendId`
- Delete friend:        `DELETE /api/users/:userId/friends/:friendId`

**Thought-Routes**💭
- Get all thoughts:     `GET /api/thoughts`
- Create thought:       `POST /api/thoughts`
- Get one thought:      `GET /api/thoughts/:id`
- Update thought:       `PUT /api/thoughts/:id`
- Delete thought:       `DELETE /api/thoughts/:id`

**Reaction-Routes**🥸
- Add reaction:         `PUT /api/thoughts/:id/reactions`
- Delete reaction:      `DELETE /api/thoughts/:id/reactions`

## Project Dependencies🧪
- express
- moment
- mongoose
- --dev-> nodemon

## Walkthrough video:

https://drive.google.com/file/d/1KV6e63SaG1y2L_SFEDofYXtyJLhyepr5/view