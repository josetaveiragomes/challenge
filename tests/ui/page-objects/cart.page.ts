import Page from './page';
import CONSTANTS from "../constants";

class CartPage extends Page {

  waitForPageElements(): void{
    this.waitForPageLoad();
    this.backButton.waitForDisplayed();
    this.checkoutButton.waitForDisplayed();
    this.itemList.waitForDisplayed();
  }

  get itemList(): WebdriverIO.Element {
    const elem = $('div[class="cart_list"]');
    elem.waitForDisplayed();
    return elem;
  }

  get items(): WebdriverIO.ElementArray {
    return this.itemList.$$('div[class="cart_item"]');
  }

  itemTitleText(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('div[class="inventory_item_name"]').getText();
  }

  itemTitleLink(item: WebdriverIO.Element): WebdriverIO.Element {
    item.waitForDisplayed();
    return item.$('div[class="cart_item_label"]').$('a');
  }

  itemTitleLinkId(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return this.itemTitleLink(item).getAttribute('id');
  }

  itemId(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return this.itemTitleLinkId(item).split('_')[1];
  }

  get backButton(): WebdriverIO.Element {
    const elem = $('button[data-test="continue-shopping"]');
    elem.waitForDisplayed();
    return elem;
  }

  get checkoutButton(): WebdriverIO.Element {
    const elem = $('button[data-test="checkout"]');
    elem.waitForClickable();
    return elem;
  }

  clickCheckoutButton(): void {
    this.checkoutButton.click();
  }

  getItemByName(name: string): WebdriverIO.Element {
    const items = this.items;
    for (let i = 0; i < items.length; i++){
      if (this.itemTitleText(items[i]) == name){
        return items[i];
      }
    }
    return this.itemList;
  }

  itemButton(item: WebdriverIO.Element): WebdriverIO.Element {
    item.waitForClickable();
    return item.$('div[class="item_pricebar"]').$('button');
  }

}

export default new CartPage(CONSTANTS.SAUCE_DEMO_URL.BASE, CONSTANTS.SAUCE_DEMO_URL.CART);
