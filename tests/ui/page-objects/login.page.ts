import Page from './page';
import CONSTANTS from "../constants";

class LoginPage extends Page{

  waitForPageElements(): boolean{
    this.waitForPageLoad();
    this.inputLoginUsername.waitForDisplayed();
    this.inputLoginPassword.waitForDisplayed();
    this.inputLoginButton.waitForDisplayed();
    return true;
  }

  get inputLoginUsername(): WebdriverIO.Element {
    const elem = $('[data-test="username"]');
    elem.waitForClickable();
    return elem;
  }

  get inputLoginPassword(): WebdriverIO.Element {
    const elem = $('[data-test="password"]');
    elem.waitForClickable();
    return elem;
  }

  get inputLoginButton(): WebdriverIO.Element {
    const elem = $('[data-test="login-button"]');
    elem.waitForClickable();
    return elem;
  }

  get errorMessage(): WebdriverIO.Element {
    const elem = $('[data-test="error"]');
    elem.waitForDisplayed();
    return elem;
  }
  
}

export default new LoginPage(CONSTANTS.SAUCE_DEMO_URL.BASE, '');
