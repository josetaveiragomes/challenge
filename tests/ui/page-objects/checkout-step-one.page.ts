import Page from './page';
import CONSTANTS from "../constants";

class CheckoutStepOnePage extends Page {

  waitForPageElements(): void{
    this.waitForPageLoad();
  }

  get checkoutInfo(): WebdriverIO.Element {
    const elem = $('div[class="checkout_info"]');
    elem.waitForDisplayed();
    return elem;
  }

  formInput (option: string): WebdriverIO.Element {
    const elem = this.checkoutInfo.$(`input[data-test="${option}"]`);
    elem.waitForClickable();
    return elem;
  }

  get firstNameInput(): WebdriverIO.Element {
    return this.formInput('firstName');
  }

  get lastNameInput(): WebdriverIO.Element {
    return this.formInput('lastName');
  }

  get postalCodeInput(): WebdriverIO.Element {
    return this.formInput('postalCode');
  }

  get firstNameInputValue(): string | null {
    return this.firstNameInput.getAttribute('value');
  }

  get lastNameInputValue(): string | null {
    return this.lastNameInput.getAttribute('value');
  }

  get postalCodeInputValue(): string | null {
    return this.postalCodeInput.getAttribute('value');
  }

  get continueButton(): WebdriverIO.Element {
    const elem = $(`input[data-test="continue"]`);
    elem.waitForClickable();
    return elem;
  } 

  clickContinueButton(): void {
    this.continueButton.click();
  }

}

export default new CheckoutStepOnePage(CONSTANTS.SAUCE_DEMO_URL.BASE, CONSTANTS.SAUCE_DEMO_URL.CHECKOUT_STEP_ONE);
