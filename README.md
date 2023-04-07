# react-chat-application

## Chat web-app built with MongoDB, ExpressJS, React, and NodeJS

### Features:
- Users can login/register with bcrypt for password hashing
- JWTs are stored in users' cookies to handle authorization of sensitive back-end endpoints
- Friends list can be used to navigate between different chats
- Instant messaging provided by sockets
- Ability to logout

### To use:
- Install MongoDB community edition
- Clone respository and run *npm i* in both client/server directories
- Run *npm start* in both directories to start server and frontend
- Frontend runs on *localhost:3000*, backend on *localhost:3001*
- Register users to see them appear in friends list, then start messaging!


![register-form](https://user-images.githubusercontent.com/59900510/230652047-9d88b56f-4cc2-4a2d-83ce-c0a3157dea00.JPG)
![login-form](https://user-images.githubusercontent.com/59900510/230652058-ac6b61f1-5574-4448-abfa-337fe2a78756.JPG)
![main-chat](https://user-images.githubusercontent.com/59900510/230652063-dc0c2a5d-4b58-4248-af82-1873c6335440.JPG)
