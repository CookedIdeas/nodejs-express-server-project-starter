# A simple node server with express

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
npm i
npm start
```

Port 3000 is used by default if not already used and is authorized. If needed, change it in .env file.
