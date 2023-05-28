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
  CONSTANTS.SIDEBAR.ALL_ITEMS,
  CONSTANTS.SIDEBAR.ABOUT,
  CONSTANTS.SIDEBAR.LOGOUT,
]

options.forEach(({CLICK_LINK, URL, OPTION}) =>{
  describe(`#006: Sidebar redirect capabilities for "${OPTION}" option`, () => {

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

    it(`should open the sidebar successfully`, () => {
      //ACTIONS
      InventoryPage.header.clickBurgerButton();
      //ASSERTIONS
      expect(InventoryPage.sidebar.aboutSidebarLink).toBeDisplayed();
      expect(InventoryPage.sidebar.inventorySidebarLink).toBeDisplayed();
      expect(InventoryPage.sidebar.logoutSidebarLink).toBeDisplayed();
      expect(InventoryPage.sidebar.resetSidebarLink).toBeDisplayed();
    });

    it(`should navigate to ${URL} successfully`, () => {
      //ACTIONS
      eval(CLICK_LINK)(InventoryPage); //clicks the link for the current object iteration
      //ASSERTIONS
      InventoryPage.waitForUrlToBe(URL);
      expect(browser.getUrl()).toContain(URL);
    });
  });
});

describe(`#007: Sidebar "Reset App State" option`, () => {
  
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

  it(`should change the filter from AZ to ZA`, () => {
    //ACTIONS
    InventoryBehaviour.selectFilter(CONSTANTS.FILTER.ZA.VALUE);
    //ASSERTIONS
    expect(InventoryPage.filterText).toBe(CONSTANTS.FILTER.ZA.TEXT);
    InventoryBehaviour.expectItemsToBeInReverseAlphabeticalOrder();
  });

  it(`should add the ${CONSTANTS.ITEM.ONESIE.TITLE} to the bag (1)`, () => {
    //ACTIONS
    InventoryBehaviour.addItemToCart(CONSTANTS.ITEM.ONESIE.TITLE);
    //ASSERTIONS
    expect(InventoryPage.header.cartBadgeText).toBe("1");
  });

  it(`should open the sidebar successfully`, () => {
    //ACTIONS
    InventoryPage.header.clickBurgerButton();
    //ASSERTIONS
    expect(InventoryPage.sidebar.aboutSidebarLink).toBeDisplayed();
    expect(InventoryPage.sidebar.inventorySidebarLink).toBeDisplayed();
    expect(InventoryPage.sidebar.logoutSidebarLink).toBeDisplayed();
    expect(InventoryPage.sidebar.resetSidebarLink).toBeDisplayed();
  });

  it(`should reset the app state`, () => {
    //ACTIONS
    InventoryPage.sidebar.resetAppState();
    InventoryPage.sidebar.closeSidebar();
    //ASSERTIONS
    InventoryBehaviour.expectToBeInBaseState(); //FAILS HERE
    expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.INVENTORY);
    expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.INVENTORY);
    expect(InventoryBehaviour.getItemButtonText(CONSTANTS.ITEM.ONESIE.TITLE)).toBe(CONSTANTS.BUTTON.ADD_TO_CART); //FAILS HERE
  });
});
