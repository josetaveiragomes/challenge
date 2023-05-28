import SideBar from './components/sidebar';
import Header from './components/header';
import Footer from './components/footer';

class Page {

  url: string;
  path: string;

  constructor(url: string, path: string) {
    this.url = url;
    this.path = path;
  }

  open(extraOption = ''): void {
    browser.url(this.url + this.path + extraOption);
    this.waitForPageLoad();
  }

  waitForPageLoad(): void {
    browser.waitUntil(
      () => browser.execute(
        () => document.readyState === 'complete'
      ),
      {
        timeoutMsg: 'Page is still not in a ready state!'
      }
    );
  }

  waitForUrlToBe(url: string): void {
    browser.waitUntil(
      () => browser.getUrl().includes(url),
      {
        timeoutMsg: `Page url is still not ${url}!`
      }
    )
  }

  get sidebar(): typeof SideBar {
    return SideBar;
  }

  get header(): typeof Header {
    return Header;
  }

  get footer(): typeof Footer {
    return Footer;
  }

}

export default Page;