//PAGE OBJECTS
import LoginPage from '../page-objects/login.page';
import InventoryPage from '../page-objects/inventory.page';

//BEHAVIOUR PATTERNS
import LoginBehaviour from '../behaviour-patterns/login.behaviour';
import InventoryBehaviour from '../behaviour-patterns/inventory.behaviour';

//CONSTANTS
import CONSTANTS from "../constants";

describe(`#004 & #005: Session cookie expires and saves cart data`, () => {
  
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

  it(`should add the ${CONSTANTS.ITEM.ONESIE.TITLE} to the bag (1)`, () => {
    //ACTIONS
    InventoryBehaviour.addItemToCart(CONSTANTS.ITEM.ONESIE.TITLE);
    //ASSERTIONS
    expect(InventoryPage.header.cartBadgeText).toBe("1");
  });

  it(`should add the ${CONSTANTS.ITEM.FLEECE_JACKET.TITLE} to the bag (2)`, () => {
    //ACTIONS
    InventoryBehaviour.addItemToCart(CONSTANTS.ITEM.FLEECE_JACKET.TITLE);
    //ASSERTIONS
    expect(InventoryPage.header.cartBadgeText).toBe("2");
  });

  it(`should expire the session and show correct message`, () => {
    //ACTIONS
    browser.deleteCookies();
    InventoryPage.header.openCart();
    LoginPage.waitForPageElements();
    //ASSERTIONS
    expect(browser.getUrl()).toContain(CONSTANTS.SAUCE_DEMO_URL.BASE);
    expect(LoginPage.errorMessageText).toBe(CONSTANTS.MESSAGE.ERROR.SESSION_EXPIRED);
  });

  it(`should login successfully and items should be in the cart`, () => {
    //ACTIONS
    LoginBehaviour.login(CONSTANTS.USER.STANDARD.USERNAME, CONSTANTS.USER.STANDARD.PASSWORD);
    //ASSERTIONS
    expect(InventoryPage.header.cartBadgeText).toBe("2");
    expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.INVENTORY);
    expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.INVENTORY);
  });

});
