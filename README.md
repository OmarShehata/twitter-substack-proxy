# twitter substack proxy

Twitter artificially limits the reach of substack links. They do not display the preview card like other links to, and tweets get limited reach if they link specifically to substack. This is a workaround.

deployed at:

## http://substack-proxy.glitch.me/

project page on glitch: https://glitch.com/~substack-proxy

**before / after**

![before_after](https://github.com/OmarShehata/twitter-substack-proxy/assets/1711126/07766d92-96c6-4b43-9980-1d81cfe2b3d3)


### Setup

Clone this repo. Install node/pnpm (https://pnpm.io/installation).

1. `pnpm install` to install node dependencies
1. Run `env.bat` to set environmant variables 
1. `pnpm watch` to run the server with auto-reload

`src/server.js` is the server code. `views/index.handlebars` is the main page. 

