//PAGE OBJECTS
import LoginPage from '../page-objects/login.page';
import InventoryPage from '../page-objects/inventory.page';

//BEHAVIOURS
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

describe(`#008: Social links redirect`, () => {
  
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

  options.forEach(({TEXT, URL}) =>{
    it(`should be redirected to ${URL}`, () => {
      //ACTIONS
      browser.switchWindow(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.INVENTORY);
      InventoryPage.footer.clickSocialLink(TEXT);
      browser.switchWindow(URL);
      //ASSERTIONS
      InventoryPage.waitForUrlToBe(URL);
      expect(browser.getUrl()).toContain(URL);
    });
  });
});