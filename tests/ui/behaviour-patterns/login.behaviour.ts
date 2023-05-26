import LoginPage from '../page-objects/login.page';
import InventoryPage from '../page-objects/inventory.page';
import CONSTANTS from "../constants";

class LoginBehaviour {

  login(username: string, password: string, success: boolean){
    LoginPage.inputLoginUsername.setValue(username);
    LoginPage.inputLoginPassword.setValue(password);
    LoginPage.inputLoginButton.click();

    if (success){
      InventoryPage.waitForPageElements();
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.INVENTORY);
    }
    else {
      expect(LoginPage.errorMessage).toBeDisplayed();
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE);
    }
  }

}

export default new LoginBehaviour;