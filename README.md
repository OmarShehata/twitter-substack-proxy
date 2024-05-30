# twitter substack proxy

### Setup

Clone this repo. Install node/pnpm (https://pnpm.io/installation).

1. `pnpm install` to install node dependencies
1. Run `env.bat` to set environmant variables 
1. `pnpm watch` to run the server with auto-reload

`src/server.js` is the server code. `views/index.handlebars` is the main page. 

TODO

- fetch the HTML page for substack from the client..?
- send that HTML to the server


### netlify notes

- http://localhost:8888/api/hello -> server
- http://localhost:3999/script.js -> static 