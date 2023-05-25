import Page from './page';

class LoginPage extends Page {

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

export default LoginPage;
