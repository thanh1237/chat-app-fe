# Chat App

## Requirements

- [x] User can register/login with email and password
- [ ] User can log in with Fb/Google account
- [ ] User stay logged in across browser refresh
- [x] User can see a list of other users
- [ ] User can search other users by name

## Implementation

- DB Design:
- [x] User Model: name, email, password, avatarUrl
- [x] Conversation Model: users [user], lastMessage, lastMessageUpdatedAt
- [x] GlobalMessage Model: user (ref User), body
- Backend:
  - Setup project:
  - [x] npx express-generator --no-view
  - [x] npm i nodemon, add: "dev": "nodemon bin/www"
  - [x] npm i dotenv cors, add them to app.js
  - [x] remove everthing in public/
  - [x] .env: PORT=5000, MONGODB_URI=mongodb://localhost:27017/chat-app
  - [x] Put in helpers/utils.helper.js
  - [x] Put error handlers in app.js
  - [x] Put in mongoose connect
  - [x] Setup endpoints: POST api/auth/login, POST api/auth/login/facebook, POST api/auth/login/google, GET api/users/me, GET api/users, GET api/conversations
  - [x] Create controllers: user.controler.js, auth.controler.js
  - [x] Middlewares: authentication, passport
  - [x] Socket.io
- Frontend:
  - [x] Setup React app with Login/Register, redux
  - [x] Get Current user when the app restart
  - [x] Add Fb/Google Login
  - [ ] UI
  - [ ] Get the list of users
  - [ ] Get the list of conversations
  - [ ] Socket.io
# chat-app-fe
