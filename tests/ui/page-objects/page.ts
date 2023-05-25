import SideBar from './components/sidebar';
import Header from './components/header';
import Footer from './components/footer';

class Page {

  url: string;

  constructor(url: string) {
    this.url = url;
  }

  get sidebar(): any {
    return SideBar;
  }

  get header(): any {
    return Header;
  }

  get footer(): any {
    return Footer;
  }

}

export default Page;