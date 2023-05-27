import Page from './page';
import CONSTANTS from "../constants";
import { textChangeRangeIsUnchanged } from 'typescript';

class ItemPage extends Page {

  waitForPageElements(): void{
    this.waitForPageLoad();
    this.itemImage.waitForDisplayed();
    this.itemTitle.waitForDisplayed();
    this.itemPrice.waitForDisplayed();
    this.itemButton.waitForDisplayed();
    this.itemDescription.waitForDisplayed();
  }

  get itemImage(): WebdriverIO.Element {
    const elem = $('img[class="inventory_details_img"]');
    elem.waitForDisplayed();
    return elem;
  }

  get itemImageText(): string {
    return this.itemImage.getAttribute('src');
  }

  get itemDescription(): WebdriverIO.Element {
    const elem = $('div[class="inventory_details_desc_container"]').$('div[class*="inventory_details_desc"]');
    elem.waitForDisplayed();
    return elem;
  }

  get itemDescriptionText(): string {
    return this.itemDescription.getText();
  }

  get itemTitle(): WebdriverIO.Element {
    const elem = $('div[class*="inventory_details_name"]');
    elem.waitForDisplayed();
    return elem;
  }

  get itemTitleText(): string {
    return this.itemTitle.getText();
  }

  get itemPrice(): WebdriverIO.Element {
    const elem = $('div[class*="inventory_details_price"]');
    elem.waitForDisplayed();
    return elem;
  }

  get itemPriceText(): string {
    return this.itemPrice.getText();
  }

  get itemButton(): WebdriverIO.Element {
    const elem = $('div[class="inventory_details_desc_container"]').$('button');
    elem.waitForDisplayed();
    return elem;
  }

  get itemButtonText(): string {
    return this.itemButton.getText();
  }

  clickItemButton(): void {
    this.itemButton.click();
  }

}

export default new ItemPage(CONSTANTS.SAUCE_DEMO_URL.BASE, CONSTANTS.SAUCE_DEMO_URL.ITEM);
