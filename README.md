# twitter substack proxy

Twitter artificially limits the reach of substack links. They do not display the preview card like other links to, and tweets get limited reach if they link specifically to substack. This is a workaround.

deployed at:

## http://substack-proxy.glitch.me/

project page on glitch: https://glitch.com/~substack-proxy

### Setup

Clone this repo. Install node/pnpm (https://pnpm.io/installation).

1. `pnpm install` to install node dependencies
1. Run `env.bat` to set environmant variables 
1. `pnpm watch` to run the server with auto-reload

`src/server.js` is the server code. `views/index.handlebars` is the main page. 

