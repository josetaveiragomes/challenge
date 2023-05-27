import Page from './page';
import CONSTANTS from "../constants";

class CheckoutStepTwoPage extends Page {

  waitForPageElements(): void{
    this.waitForPageLoad();
    this.backButton.waitForDisplayed();
    this.finishButton.waitForDisplayed();
    this.itemList.waitForDisplayed();
    this.summaryInfo.waitForDisplayed();
    this.summarySubtotal.waitForDisplayed();
    this.summaryTax.waitForDisplayed();
    this.summaryTotal.waitForDisplayed();
  }

  get itemList(): WebdriverIO.Element {
    const elem = $('div[class="cart_list"]');
    elem.waitForDisplayed();
    return elem;
  }

  get summaryInfo(): WebdriverIO.Element {
    const elem = $('div[class="summary_info"]');
    elem.waitForDisplayed();
    return elem;
  }

  get summaryInformationLabels(): WebdriverIO.ElementArray {
    return this.summaryInfo.$$('div[class="summary_info_label"]');
  }

  get summaryInformationValues(): WebdriverIO.ElementArray {
    return this.summaryInfo.$$('div[class="summary_value_label"]');
  }

  get paymentInformation(): WebdriverIO.Element {
    const elem = this.summaryInformationValues[0];
    elem.waitForDisplayed();
    return elem;
  }

  get paymentInformationText(): string {
    return this.paymentInformation.getText();
  }

  get shippingInformation(): WebdriverIO.Element {
    const elem = this.summaryInformationValues[1];
    elem.waitForDisplayed();
    return elem;
  }

  get shippingInformationText(): string {
    return this.shippingInformation.getText();
  }

  get summarySubtotal(): WebdriverIO.Element {
    const elem = this.summaryInfo.$('div[class="summary_subtotal_label"]');
    elem.waitForDisplayed();
    return elem;
  }

  get summaryTax(): WebdriverIO.Element {
    const elem = this.summaryInfo.$('div[class="summary_tax_label"]');
    elem.waitForDisplayed();
    return elem;
  }

  get summaryTotal(): WebdriverIO.Element {
    const elem = this.summaryInfo.$('div[class*="summary_total_label"]');
    elem.waitForDisplayed();
    return elem;
  }

  get items(): WebdriverIO.ElementArray {
    return this.itemList.$$('div[class="cart_item"]');
  }

  itemPriceText(item: WebdriverIO.Element): string {
    item.waitForDisplayed();
    return item.$('div[class="inventory_item_price"]').getText();
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
    const elem = $('button[data-test="cancel"]');
    elem.waitForDisplayed();
    return elem;
  }

  get finishButton(): WebdriverIO.Element {
    const elem = $('button[data-test="finish"]');
    elem.waitForClickable();
    return elem;
  }

  clickFinishButton(): void {
    this.finishButton.click();
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

  get subtotal(): number {
    return parseFloat(this.summarySubtotal.getText().split('$')[1]);
  }

  get tax(): number {
    return parseFloat(this.summaryTax.getText().split('$')[1]);
  }

  get total(): number {
    return parseFloat(this.summaryTotal.getText().split('$')[1]);
  }

  get totalSum(): number {
    return this.subtotal + this.tax;
  }

}

export default new CheckoutStepTwoPage(CONSTANTS.SAUCE_DEMO_URL.BASE, CONSTANTS.SAUCE_DEMO_URL.CHECKOUT_STEP_TWO);
