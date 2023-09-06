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
mkdir your-folder-name
cd your-folder-name
git init
git pull https://github.com/CookedIdeas/extra-simple-express-server.git
npm i
npm start
```

Port 3000 is used by default. If needed, change it in .env file.
Only http://localhost:8888 is authorized as an origin. If needed, you can add or remove allowed origins in app.js, search for "const cors" and modify allowedOrigin array.

To test the server, make a GET request at http://localhost:3000/api/test (make sure to use origin : http://localhost:8888)

Happy coding ;)
