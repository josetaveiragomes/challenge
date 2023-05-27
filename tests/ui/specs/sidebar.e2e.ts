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
  {
    CLICK_LINK: "(function click(page) {page.sidebar.clickInventorySidebarLink();})",
    URL: CONSTANTS.SIDEBAR.ALL_ITEMS
  },
  {
    CLICK_LINK: "(function click(page) {page.sidebar.clickAboutSidebarLink();})",
    URL: CONSTANTS.SIDEBAR.ABOUT
  },
  {
    CLICK_LINK: "(function click(page) {page.sidebar.clickLogoutSidebarLink();})",
    URL: CONSTANTS.SIDEBAR.LOGOUT
  },
]

options.forEach(({CLICK_LINK, URL}) =>{
  describe(`#005: Sidebar redirect capabilities`, () => {
    
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

describe(`#006: Sidebar reset app state option`, () => {
  
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
    //ASSERTIONS
    InventoryBehaviour.expectToBeInBaseState(); //FAILS HERE 
    expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.INVENTORY);
    expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.INVENTORY);
    expect(InventoryBehaviour.getItemButtonText(CONSTANTS.ITEM.ONESIE.TITLE)).toBe(CONSTANTS.BUTTON.ADD_TO_CART);
  });
});
