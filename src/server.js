import express from 'express'
import { engine, create } from 'express-handlebars';
import crypto from 'crypto'
import { dirname } from 'path';
import path from 'path'
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom'
import { error } from 'console';
import fetch from 'node-fetch';

const __dirname = dirname(fileURLToPath(import.meta.url));
// TODO: how to ensure this doesn't get overwritten between deploys?
const URLS_DIRECTORY = path.join(__dirname, '../public/articles/')

const expresshandlebars = create();


async function run() {
  fs.mkdirSync(URLS_DIRECTORY, { recursive: true });

  const app = express();
  app.engine('handlebars', engine({
    helpers: {
      json: JSON.stringify
    }
  }));
  app.use(express.static('public'));
  app.set('view engine', 'handlebars');
  app.set('views', './views');
  app.use(express.json());

  ///// Pages
  app.get("/", async function (request, response) {
    response.render('index', { average:0 })
  });
  app.get("/generate-url/:url/:force?", async function (request, response) {
    const url = request.params.url
    const force = request.params.force === 'true'
    // const md5 = crypto.createHash('md5')
    // const hash = md5.update(url).digest('hex')
    const hash = btoa(decodeURIComponent(url))
    const filepath = `${URLS_DIRECTORY}/${hash}.html`

    if (fs.existsSync(filepath) && force != true) {
      response.json({ done: true, cached: true, hash  })
      return
    }
    
    // fetch substack page, extra meta tags
    let htmlPage
    try {
      const articleRequest = await fetch(url);
      htmlPage = await articleRequest.text();
    } catch (e) {
      response.json({ done: false, error: String(e)  })
      return 
    }
    
    const dom = new JSDOM(htmlPage);
    function query(str) {
      return dom.window.document.querySelector(str).content
    }
    const title = query(`meta[property="og:title"]`) 
    const description = query(`meta[property="og:description"]`) 
    const image = query(`meta[name="twitter:image"]`) 
    // create an html page to mimic those tags
    const templateSource = fs.readFileSync('./views/article-card-template.handlebars', 'utf-8')
    const generatedtemplate = expresshandlebars.handlebars.compile(templateSource);
    fs.writeFileSync(filepath, generatedtemplate({ title, description, image, url }), 'utf-8');
    response.json({ done: true,hash })
  });

  const listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });

}

run()
