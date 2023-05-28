//PAGE OBJECTS
import LoginPage from '../page-objects/login.page';
import InventoryPage from '../page-objects/inventory.page';

//BEHAVIOUR PATTERNS
import LoginBehaviour from '../behaviour-patterns/login.behaviour';
import InventoryBehaviour from '../behaviour-patterns/inventory.behaviour';

//CONSTANTS
import CONSTANTS from "../constants";

//TEST DATA
const options = [
  CONSTANTS.SOCIAL.FACEBOOK,
  CONSTANTS.SOCIAL.TWITTER,
  CONSTANTS.SOCIAL.LINKEDIN,
]

options.forEach(({TEXT, URL}) =>{
  describe(`#009: Social links redirect for "${TEXT}"`, () => {
  
    before(function() {
      LoginPage.open();
    });

    it(`should login successfully`, () => {
      //ACTIONS
      LoginBehaviour.login(CONSTANTS.USER.STANDARD.USERNAME, CONSTANTS.USER.STANDARD.PASSWORD);
      //ASSERTIONS
      InventoryBehaviour.expectToBeInBaseState();
      expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.INVENTORY);
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.INVENTORY);
    });

    it(`should be redirected to "${URL}"`, () => {
      //ACTIONS
      InventoryPage.footer.clickSocialLink(TEXT);
      browser.switchWindow(URL);
      //ASSERTIONS
      InventoryPage.waitForUrlToBe(URL);
      expect(browser.getUrl()).toContain(URL);
    });
  });
});