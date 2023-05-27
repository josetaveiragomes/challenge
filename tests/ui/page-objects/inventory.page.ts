import Page from './page';
import CONSTANTS from "../constants";

class InventoryPage extends Page {

  waitForPageElements(): void{
    this.waitForPageLoad();
    this.filter.waitForDisplayed();
    this.itemList.waitForDisplayed();
  }

  get filter(): WebdriverIO.Element {
    const elem = $('select[data-test="product_sort_container"]');
    elem.waitForDisplayed();
    return elem;
  }

  get filterActiveOption(): WebdriverIO.Element {
    const elem = $('span[class="select_container"]').$('span[class="active_option"]');
    elem.waitForDisplayed();
    return elem;
  }

  get filterText(): string {
    return this.filterActiveOption.getText();
  }

  selectFilterOption(option: string): void {
    this.filter.selectByAttribute('value', option);
  }

  get itemList(): WebdriverIO.Element {
    const elem = $('div[class="inventory_list"]');
    elem.waitForDisplayed();
    return elem;
  }

  get items(): WebdriverIO.ElementArray {
    return this.itemList.$$('div[class="inventory_item"]');
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

  itemImageText(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('img[class="inventory_item_img"]').getAttribute('src');
  }

  itemDescriptionText(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('div[class="inventory_item_desc"]').getText();
  }

  itemTitleText(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('div[class="inventory_item_name"]').getText();
  }

  itemPriceText(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('div[class="inventory_item_price"]').getText();
  }

  itemTitleLink(item: WebdriverIO.Element): WebdriverIO.Element {
    item.waitForDisplayed();
    return item.$('div[class="inventory_item_label"]').$('a');
  }

  itemTitleLinkId(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return this.itemTitleLink(item).getAttribute('id');
  }

  itemImageLinkId(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('div[class="inventory_item_img"]').$('a').getAttribute('id');
  }

  itemId(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return this.itemTitleLinkId(item).split('_')[1];
  }
  
  itemButton(item: WebdriverIO.Element): WebdriverIO.Element {
    item.waitForDisplayed();
    return item.$('div[class="pricebar"]').$('button');
  }

  itemButtonText(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return this.itemButton(item).getText();
  }

}

export default new InventoryPage(CONSTANTS.SAUCE_DEMO_URL.BASE, CONSTANTS.SAUCE_DEMO_URL.INVENTORY);
