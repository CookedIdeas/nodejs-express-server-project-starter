# PROJECT STARTER : A simple node server with express

A basic express server to easily start a new project.

Server logic in app.js
Routes logic in routes folder
Controllers logic in controller folder

## Minimal securing

- allowed origins picked from a list
- secure http headers with helmet package (https://www.npmjs.com/package/helmet)
- requests size is limited by default
- noSQL injection prevented with use of content-filter package to blacklist list of potentially dangerous char chains (https://www.npmjs.com/package/content-filter)
- protection against HTTP Parameter Pollution attacks with hpp package (https://www.npmjs.com/package/hpp)

Not enough ? Yeah you're right, it's a minimal securing configuration ;) feel free to suggest or add new features !

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

Only http://localhost:8888 is authorized as an origin. If needed, you can add or remove allowed origins : search for "yourAllowedOrigins" constant in app.js and modify the object as needed.

To test the server, make a GET request at http://localhost:3000/api/test (make sure to use an allowed origin).

Happy coding ;)

## What's next ?

Content-filter package will be replaced by a sanitizer.
