# twitter substack proxy

Twitter artificially limits the reach of substack links. They do not display the preview card like other links to, and tweets get limited reach if they link specifically to substack. This is a workaround.

deployed at:

## http://substack-proxy.glitch.me/

project page on glitch: https://glitch.com/~substack-proxy

**before / after**

![before_after](https://github.com/OmarShehata/twitter-substack-proxy/assets/1711126/07766d92-96c6-4b43-9980-1d81cfe2b3d3)

Example page source (with `?noredirect` param so you can view source). It will appear blank, because it only has meta tags and a JS snippet to redirect to the substack article:

https://substack-proxy.glitch.me/articles/omarshehata_substack_com_p_my-favorite-1980s-canadian-tv-show.html?nodirect

### Setup

Clone this repo. Install node/pnpm (https://pnpm.io/installation).

1. `pnpm install` to install node dependencies
1. Run `env.bat` to set environmant variables 
1. `pnpm watch` to run the server with auto-reload

`src/server.js` is the server code. `views/index.handlebars` is the main page. 

### How it works

This is an extremely low-tech thing, you can even do it yourself by hand!

1. [This is the template](views/article-card-template.handlebars) that it generates
2. You can copy this info from the substack HTML page (or fill it yourself with whatever you need it to say)
3. You can put this HTML page anywhere that is publicly accessible, then share that on twitter, and it will look like a substack article, and redirect to it. 

Even if they banned this glitch app, anyone can host this on their own website, or on any free static host like glitch/codepen/replit etc. 

If my app ever breaks or catches fire and burns, the URLs it generates are derived from the original URLs, so no data is lost (a quick google search will find the original article).

I debated preserving the original URL as-is by base64-encoding it, but that sacrifices readability.

