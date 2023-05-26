import Page from './page';
import CONSTANTS from "../constants";

class InventoryPage extends Page {

  waitForPageElements(): void{
    this.waitForPageLoad();
    this.filter.waitForDisplayed();
    this.itemList.waitForDisplayed();
  }

  get filter(): WebdriverIO.Element {
    const elem = $('[data-test="product_sort_container"]');
    elem.waitForDisplayed();
    return elem;
  }

  get filterActiveOption(): WebdriverIO.Element {
    const elem = $('[class="select_container"]').$('[class="active_option"]');
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
    const elem = $('[class="inventory_list"]');
    elem.waitForDisplayed();
    return elem;
  }

  get items(): WebdriverIO.ElementArray {
    return this.itemList.$$('[class="inventory_item"]');
  }

  getItemByName(name: string): WebdriverIO.Element {
    const items = this.items;
    for (let i = 0; i < items.length; i++){
      if (this.itemTitle(items[i]) == name){
        return items[i];
      }
    }
    return this.itemList;
  }

  itemImage(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('[class="inventory_item_img"]').getAttribute('src');
  }

  itemDescription(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('[class="inventory_item_desc"]').getText();
  }

  itemTitle(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('[class="inventory_item_name"]').getText();
  }

  itemPrice(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('[class="inventory_item_price"]').getText();
  }

  itemTitleLink(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('[class="inventory_item_label"]').$('a').getAttribute('id');
  }

  itemImageLink(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('[class="inventory_item_img"]').$('a').getAttribute('id');
  }

  itemId(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return this.itemTitleLink(item).split('_')[1];
  }
  
  itemButton(item: WebdriverIO.Element): WebdriverIO.Element {
    item.waitForDisplayed();
    return item.$('[class="pricebar"]').$('button');
  }

  itemButtonText(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return this.itemButton(item).getText();
  }

}

export default new InventoryPage(CONSTANTS.SAUCE_DEMO_URL.BASE, CONSTANTS.SAUCE_DEMO_URL.INVENTORY);
