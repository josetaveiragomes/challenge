import Page from './page';
import CONSTANTS from "../constants";

class CartPage extends Page {

  waitForPageElements(): void{
    this.waitForPageLoad();
    this.backButton.waitForDisplayed();
    this.checkoutButton.waitForDisplayed();

  }

  get cartList(): WebdriverIO.Element {
    const elem = $('div[class="cart_list"]');
    elem.waitForDisplayed();
    return elem;
  }

  get cartItems(): WebdriverIO.ElementArray {
    return this.cartList.$$('div[class="cart_item"]');
  }

  get backButton(): WebdriverIO.Element {
    const elem = $('button[data-test="continue-shopping"]');
    elem.waitForDisplayed();
    return elem;
  }

  get checkoutButton(): WebdriverIO.Element {
    const elem = $('button[data-test="checkout"]');
    elem.waitForDisplayed();
    return elem;
  }

}

export default new CartPage(CONSTANTS.SAUCE_DEMO_URL.BASE, CONSTANTS.SAUCE_DEMO_URL.CART);
