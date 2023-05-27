//PAGE OBJECTS
import ItemPage from '../page-objects/item.page';
import LoginPage from '../page-objects/login.page';
import InventoryPage from '../page-objects/inventory.page';

//BEHAVIOURS
import ItemBehaviour from '../behaviour-patterns/item.behaviour';
import LoginBehaviour from '../behaviour-patterns/login.behaviour'
import InventoryBehaviour from '../behaviour-patterns/inventory.behaviour';

//CONSTANTS
import CONSTANTS from "../constants";

// TEST DATA
const users = [
  CONSTANTS.USER.STANDARD,
  // CONSTANTS.USER.PROBLEM,
  // CONSTANTS.USER.PERFORMANCE_GLITCH,
]

users.forEach(({USERNAME, PASSWORD}) =>{
  describe(`#023: Happy Path for ${USERNAME}`, () => {
    
    before( function() {
      LoginPage.open();
    });

    it(`should login successfully with ${USERNAME}`, () => {
      //ACTIONS
      LoginBehaviour.login(USERNAME, PASSWORD, true);
      //ASSERTIONS
      InventoryBehaviour.expectToBeInBaseState();
      expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.INVENTORY);
    });

    it(`should change the filter from AZ to ZA`, () => {
      //ACTIONS
      InventoryBehaviour.selectFilter(CONSTANTS.FILTER.ZA.VALUE);
      //ASSERTIONS
      InventoryBehaviour.expectItemsToBeInReverseAlphabeticalOrder();
      expect(InventoryPage.filterText).toBe(CONSTANTS.FILTER.ZA.TEXT);
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

    it(`should add the ${CONSTANTS.ITEM.BIKE_LIGHT.TITLE} to the bag (3)`, () => {
      //ACTIONS
      InventoryBehaviour.addItemToCart(CONSTANTS.ITEM.BIKE_LIGHT.TITLE);
      //ASSERTIONS
      expect(InventoryPage.header.cartBadgeText).toBe("3");
    });

    it(`should open the ${CONSTANTS.ITEM.BOLT_TSHIRT.TITLE} item page successfully`, () => {
      //ACTIONS
      InventoryBehaviour.openItem(CONSTANTS.ITEM.BOLT_TSHIRT.TITLE);
      //ASSERTIONS
      ItemBehaviour.validateItemDetails(CONSTANTS.ITEM.BOLT_TSHIRT);
      expect(ItemPage.itemButtonText).toBe(CONSTANTS.BUTTON.ADD_TO_CART);
      expect(ItemPage.header.secondaryButtonText).toBe(CONSTANTS.HEADER.ITEM);
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.ITEM + CONSTANTS.ITEM.BOLT_TSHIRT.ID);
    });

    it(`should add the ${CONSTANTS.ITEM.BOLT_TSHIRT.TITLE} to the bag (4)`, () => {
      //ACTIONS
      ItemPage.clickItemButton();
      //ASSERTIONS
      expect(ItemPage.itemButtonText).toBe(CONSTANTS.BUTTON.REMOVE);
      expect(ItemPage.header.cartBadgeText).toBe("4");
    });

    it(`should remove the ${CONSTANTS.ITEM.BOLT_TSHIRT.TITLE} from the bag (3)`, () => {
      //ACTIONS
      ItemPage.clickItemButton();
      //ASSERTIONS
      expect(ItemPage.itemButtonText).toBe(CONSTANTS.BUTTON.ADD_TO_CART);
      expect(ItemPage.header.cartBadgeText).toBe("3");
    });

    it(`should open the cart page`, () => {
      //ACTIONS
      ItemPage.header.openCart();
      //ASSERTIONS
      expect(ItemPage.header.cartBadgeText).toBe("3");
      expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.CART);

      //ASSERT ITEMS ADDED ARE IN THE BAG (BY ORDER OF ADDITION)
      
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.CART);

    });

    it(`should remove the ${CONSTANTS.ITEM.FLEECE_JACKET.TITLE} item from the bag (2)`, () => {
      
    });

    it(`should go to checkout page one (using the Checkout button)`, () => {
      
    });

    it(`should go to checkout page two (filling in the details and pressing the Continue button)`, () => {
      
    });

    it(`should complete the purchase successfully`, () => {
      
    });

    it(`should go back to inventory page (using the Back Home button)`, () => {
      
    });

  });
});