# react-chat-application

## Chat web-app built with MongoDB, ExpressJS, React, and NodeJS

### Features:
- Users can login/register with bcrypt for password hashing
- JWTs are stored in users' cookies to handle authorization of sensitive back-end endpoints
- Friends list can be used to navigate between different chats
- Instant messaging provided by sockets
- Ability to logout from the chat application

### Notes:
- Tokens are set to expire after 300 seconds for the demonstration of functionality
- Username and _id are stored in local storage and cleared on logout/token expiration

### To use:
- Install MongoDB community edition
- Clone respository and run *npm i* in both client/server directories
- Run *npm start* in both directories to start server and frontend
- Frontend runs on *localhost:3000*, backend on *localhost:3001*
- Register users to see them appear in friends list, then start messaging!

