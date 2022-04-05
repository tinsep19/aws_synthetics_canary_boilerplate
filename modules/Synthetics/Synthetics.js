const http = require('http');
const https = require('https');

class Synthetics {
  constructor(puppeteer, configuration) {
    this.puppeteer = puppeteer;
    this.browser = null;
    this.page = null;
    this.config = configuration;
    this.options = { headless: false };
  }

  addUserAgent(page, userAgent) {
    return Promise.resolve();
  }

  executeStep(step, scenario, stepConfig) {
    return new Promise((ok, ng) => { try { ok(scenario()); } catch (e) { ng(e); } });
  }

  executeHttpStep(step, requestOptions, callback, stepConfig) {
    const proto = (requestOptions.protocol == "https:" ? https : http);
    const body = requestOptions.body;
    delete requestOptions.body;

    if (!callback) {
      callback = (res) => {
        console.log('statusCode : ', res.statusCode);
        return res.statusCode >= 400 ? Promise.reject() : Promise.resolve();
      }
    }

    return new Promise(resolve => {
      const req = proto.request(requestOptions, resolve);
      if (body) {
        req.write(body);
      }
      req.end();
    })
      .then(callback)
      .then(() => console.log(`success ${step}`))
      .catch(() => console.log(`failure ${step}`));
  }
  getConfiguration() {
    return this.config;
  }
  takeScreenshot(step, section) {
    return Promise.resolve();
  }

  getDefaultLaunchOptions() {
    return Promise.resolve(this.options);
  }

  launch() {
    if (this.browser) {
      this.browser.close();
      this.browser = null;
    }
    return this.puppeteer.launch(this.options).then(browser => { this.browser = browser; return browser; });
  }

  getPage() {
    const browser = this.browser;
    return browser.pages()
      .then(pages => pages.length > 0 ? pages[0] : browser.newPage());
  }

  setUp() {
    return this.launch();
  }

  tearDown() {
    let closeTask = [];
    if (this.page) {
      closeTask.push(this.page.close());
      this.page = null;
    }

    if (this.browser) {
      closeTask.push(this.browser.close());
      this.browser = null;
    }
    return Promise.all(closeTask);
  }
};
module.exports = Synthetics;