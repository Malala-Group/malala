import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner().split('?')[0];
    console.log(url);
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }

  async initialLoad() {
    await this.renderPage();
  }
}

export default App;
