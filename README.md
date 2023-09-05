# PROJECT STARTER : A simple node server with express

A basic express server to easily start a new project

## Minimal securing

- Access-Control-Allow-Origin header picked from a list
- secure http headers with helmet package (https://www.npmjs.com/package/helmet)
- protection against server overload with toobusy package (https://www.npmjs.com/package/toobusy-js)
- requests size is limited
- noSQL injection prevented with use of content-filter package to blacklist list of potentially dangerous char chains (https://www.npmjs.com/package/content-filter)
- protection against HTTP Parameter Pollution attacks with hpp package (https://www.npmjs.com/package/hpp)

## Installation and use

```
git clone https://github.com/CookedIdeas/extra-simple-express-server.git
cd extra-simple-express-server
npm i
npm start
```

Port 3000 is used by default. If needed, change it in .env file.
Only http://localhost:3000 is authorized as an origin. If needed, you can add or remove allowed origins in app.js, search for "const cors" and modify allowedOrigin array.

## Git init helper

To init your new git :

```
[add ".env" to .gitignore file]
git init
git add .
git commit -m "first commit"
git branch -M main
git remote set-url origin {new git url here}
git push -u origin main
```

To test the server, make a GET request at http://localhost:{3000 || YOUR PORT HERE}/api/test

Happy coding ;)
