import Page from './page';
import CONSTANTS from "../constants";

class CheckoutCompletePage extends Page {

  waitForPageElements(): void{
    this.waitForPageLoad();
    this.checkmarkIcon.waitForDisplayed();
    this.thankYouHeader.waitForDisplayed();
    this.thankYouBody.waitForDisplayed();
    this.homeButton.waitForDisplayed();
  }

  get checkoutContainer(): WebdriverIO.Element {
    const elem = $('div[id="checkout_complete_container"]');
    elem.waitForDisplayed();
    return elem;
  }

  get checkmarkIcon(): WebdriverIO.Element {
    const elem = this.checkoutContainer.$('img');
    elem.waitForDisplayed();
    return elem;
  }

  get checkmarkIconText(): string {
    return this.checkmarkIcon.getAttribute('src');
  }

  get thankYouHeader(): WebdriverIO.Element {
    const elem = this.checkoutContainer.$('h2[class="complete-header"]');
    elem.waitForDisplayed();
    return elem;
  }

  get thankYouHeaderText(): string {
    return this.thankYouHeader.getText();
  }

  get thankYouBody(): WebdriverIO.Element {
    const elem = this.checkoutContainer.$('div[class="complete-text"]');
    elem.waitForDisplayed();
    return elem;
  }

  get thankYouBodyText(): string {
    return this.thankYouBody.getText();
  }

  get homeButton(): WebdriverIO.Element {
    const elem = this.checkoutContainer.$('button[data-test="back-to-products"]');
    elem.waitForClickable();
    return elem;
  }

  clickHomeButton(): void {
    this.homeButton.click();
  }

}

export default new CheckoutCompletePage(CONSTANTS.SAUCE_DEMO_URL.BASE, CONSTANTS.SAUCE_DEMO_URL.CHECKOUT_COMPLETE);
