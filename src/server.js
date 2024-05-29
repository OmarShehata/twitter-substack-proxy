import express from 'express'
import { engine, create } from 'express-handlebars';
import crypto from 'crypto'
import { dirname } from 'path';
import path from 'path'
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom'

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATA_DIRECTORY =  path.join(__dirname, '../.data/')
const URLS_DIRECTORY = path.join(DATA_DIRECTORY, 'urls')

const expresshandlebars = create();


async function run() {
  // Initialize data directories
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
  app.get("/url/:url", async function (request, response) {
    const url = request.params.url
    const md5 = crypto.createHash('md5')
    const hash = md5.update(url).digest('hex')
    const filepath = `${URLS_DIRECTORY}/${hash}.html`
    if (fs.existsSync(filepath)) {
      // if the generated html page exists, just return it
      response.sendFile(filepath)
      return
    }

    // otherwise, generate an html file that has the same <meta> tags as substack
    const articleRequest = await fetch(url);
    const htmlPage = await articleRequest.text();
    const dom = new JSDOM(htmlPage);
    function query(str) {
      return dom.window.document.querySelector(str).content
    }
    const title = query(`meta[property="og:title"]`) 
    const description = query(`meta[property="og:description"]`) 
    const image = query(`meta[name="twitter:image"]`) 

    const templateSource = fs.readFileSync('./views/article-card-template.handlebars', 'utf-8')
    const generatedtemplate = expresshandlebars.handlebars.compile(templateSource);
    fs.writeFileSync(filepath, generatedtemplate({ title, description, image, url }), 'utf-8');
    response.sendFile(filepath)
  });

  const listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });

}

run()
