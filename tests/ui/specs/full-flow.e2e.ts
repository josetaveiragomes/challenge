//PAGE OBJECTS
import LoginPage from '../page-objects/login.page';
import InventoryPage from '../page-objects/inventory.page';

//BEHAVIOURS
import LoginBehaviour from '../behaviour-patterns/login.behaviour'

//CONSTANTS
import CONSTANTS from "../constants";
import InventoryBehaviour from '../behaviour-patterns/inventory.behaviour';
import inventoryPage from '../page-objects/inventory.page';

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
      LoginBehaviour.login(USERNAME, PASSWORD, true);
      InventoryBehaviour.expectToBeInBaseState();
    });

    it(`should change the filter from AZ to ZA`, () => {
      InventoryPage.filter.click();
      InventoryPage.selectFilterOption(CONSTANTS.FILTER.ZA.VALUE);

      InventoryBehaviour.expectItemsToBeInReverseAlphabeticalOrder();
      expect(InventoryPage.filterText).toBe(CONSTANTS.FILTER.ZA.TEXT);
    });

    it(`should add the ${CONSTANTS.ITEM.ONESIE.TITLE} to the bag (1)`, () => {
      InventoryBehaviour.addItemToCart(CONSTANTS.ITEM.ONESIE.TITLE);
      expect(InventoryPage.header.cartBadgeText).toBe("1");
    });

    it(`should add the ${CONSTANTS.ITEM.FLEECE_JACKET.TITLE} to the bag (2)`, () => {
      InventoryBehaviour.addItemToCart(CONSTANTS.ITEM.FLEECE_JACKET.TITLE);
      expect(InventoryPage.header.cartBadgeText).toBe("2");
    });

    it(`should add the ${CONSTANTS.ITEM.BIKE_LIGHT.TITLE} to the bag (3)`, () => {
      InventoryBehaviour.addItemToCart(CONSTANTS.ITEM.BIKE_LIGHT.TITLE);
      expect(InventoryPage.header.cartBadgeText).toBe("3");
    });

    it(`should open the ${CONSTANTS.ITEM.BOLT_TSHIRT.TITLE} item page successfully`, () => {
      
    });

    it(`should add the ${CONSTANTS.ITEM.BOLT_TSHIRT.TITLE} to the bag (4)`, () => {
      
    });

    it(`should remove the ${CONSTANTS.ITEM.BOLT_TSHIRT.TITLE} from the bag (3)`, () => {
      
    });

    it(`should open the cart page`, () => {
      
    });

    it(`should remove the ${CONSTANTS.ITEM.FLEECE_JACKET.TITLE} from the bag (2)`, () => {
      
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