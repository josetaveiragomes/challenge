//PAGE OBJECTS
import ItemPage from '../page-objects/item.page';
import CartPage from '../page-objects/cart.page';
import LoginPage from '../page-objects/login.page';
import InventoryPage from '../page-objects/inventory.page';
import CheckoutStepOnePage from '../page-objects/checkout-step-one.page';
import CheckoutStepTwoPage from '../page-objects/checkout-step-two.page';
import CheckoutCompletePage from '../page-objects/checkout-complete.page';

//BEHAVIOUR PATTERNS
import ItemBehaviour from '../behaviour-patterns/item.behaviour';
import CartBehaviour from '../behaviour-patterns/cart.behaviour';
import LoginBehaviour from '../behaviour-patterns/login.behaviour';
import InventoryBehaviour from '../behaviour-patterns/inventory.behaviour';
import CheckoutStepOneBehaviour from '../behaviour-patterns/checkout-step-one.behaviour';
import CheckoutStepTwoBehaviour from '../behaviour-patterns/checkout-step-two.behaviour';

//CONSTANTS
import CONSTANTS from "../constants";

// TEST DATA
const users = [
  CONSTANTS.USER.STANDARD,
  CONSTANTS.USER.PROBLEM,
  CONSTANTS.USER.PERFORMANCE_GLITCH, //Flaky results since it timeouts ocasionally
]

const items_added_order = [
  CONSTANTS.ITEM.ONESIE,
  CONSTANTS.ITEM.FLEECE_JACKET,
  CONSTANTS.ITEM.BIKE_LIGHT,
]

const items_final_order = [
  CONSTANTS.ITEM.ONESIE,
  CONSTANTS.ITEM.BIKE_LIGHT,
]

users.forEach(({USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, POSTAL_CODE, PAYMENT_INFO, SHIPPING_INFO}) =>{
  describe(`#024: Happy Path for "${USERNAME}" user`, () => {
    
    before(function() {
      LoginPage.open();
    });

    it(`should login successfully with "${USERNAME}"`, () => {
      //ACTIONS
      LoginBehaviour.login(USERNAME, PASSWORD);
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

    it(`should add the "${CONSTANTS.ITEM.ONESIE.TITLE}" and "${CONSTANTS.ITEM.FLEECE_JACKET.TITLE}" items to the bag (2)`, () => {
      //ACTIONS
      InventoryBehaviour.addItemsToCart([CONSTANTS.ITEM.ONESIE.TITLE, CONSTANTS.ITEM.FLEECE_JACKET.TITLE]);
      //ASSERTIONS
      expect(InventoryPage.header.cartBadgeText).toBe("2");
    });

    it(`should remove the "${CONSTANTS.ITEM.FLEECE_JACKET.TITLE}" from the bag (1)`, () => {
      //ACTIONS
      InventoryBehaviour.removeItemFromCart(CONSTANTS.ITEM.FLEECE_JACKET.TITLE);
      //ASSERTIONS
      expect(InventoryPage.header.cartBadgeText).toBe("1");
    });

    it(`should add the "${CONSTANTS.ITEM.FLEECE_JACKET.TITLE}" and "${CONSTANTS.ITEM.BIKE_LIGHT.TITLE}" items to the bag (3)`, () => {
      //ACTIONS
      InventoryBehaviour.addItemsToCart([CONSTANTS.ITEM.FLEECE_JACKET.TITLE, CONSTANTS.ITEM.BIKE_LIGHT.TITLE]);
      //ASSERTIONS
      expect(InventoryPage.header.cartBadgeText).toBe("3");
    });

    it(`should open the "${CONSTANTS.ITEM.BOLT_TSHIRT.TITLE}" item page successfully`, () => {
      //ACTIONS
      InventoryBehaviour.openItem(CONSTANTS.ITEM.BOLT_TSHIRT.TITLE);
      //ASSERTIONS
      ItemBehaviour.validateItemDetails(CONSTANTS.ITEM.BOLT_TSHIRT);
      expect(ItemPage.itemButtonText).toBe(CONSTANTS.BUTTON.ADD_TO_CART);
      expect(ItemPage.header.secondaryButtonText).toBe(CONSTANTS.HEADER.ITEM);
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.ITEM + CONSTANTS.ITEM.BOLT_TSHIRT.ID);
    });

    it(`should add the "${CONSTANTS.ITEM.BOLT_TSHIRT.TITLE}" to the bag (4)`, () => {
      //ACTIONS
      ItemPage.clickItemButton();
      //ASSERTIONS
      expect(ItemPage.itemButtonText).toBe(CONSTANTS.BUTTON.REMOVE);
      expect(ItemPage.header.cartBadgeText).toBe("4");
    });

    it(`should remove the "${CONSTANTS.ITEM.BOLT_TSHIRT.TITLE}" from the bag (3)`, () => {
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
      CartBehaviour.expectItemsToBeInOrder(items_added_order);
      expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.CART);
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.CART);
    });

    it(`should remove the "${CONSTANTS.ITEM.FLEECE_JACKET.TITLE}" item from the bag (2)`, () => {
      //ACTIONS
      CartBehaviour.removeItem(CONSTANTS.ITEM.FLEECE_JACKET.TITLE);
      //ASSERTIONS
      expect(ItemPage.header.cartBadgeText).toBe("2");
      CartBehaviour.expectItemsToBeInOrder(items_final_order);
    });

    it(`should go to checkout page one (using the Checkout button)`, () => {
      //ACTIONS
      CartPage.clickCheckoutButton();
      //ASSERTIONS
      expect(ItemPage.header.cartBadgeText).toBe("2");
      expect(CheckoutStepOnePage.checkoutInfo).toBeDisplayed();
      expect(CheckoutStepOnePage.firstNameInputValue).toBe(CONSTANTS.EMPTY_STRING);
      expect(CheckoutStepOnePage.lastNameInputValue).toBe(CONSTANTS.EMPTY_STRING);
      expect(CheckoutStepOnePage.postalCodeInputValue).toBe(CONSTANTS.EMPTY_STRING);
      expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.CHECKOUT_ONE);
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.CHECKOUT_STEP_ONE);
    });

    it(`should go to checkout page two (filling in the details and pressing the Continue button)`, () => {
      //ACTIONS
      CheckoutStepOneBehaviour.fillForm(FIRST_NAME, LAST_NAME, POSTAL_CODE);
      CheckoutStepOnePage.clickContinueButton();
      //ASSERTIONS
      CheckoutStepTwoBehaviour.expectItemsToBeInOrder(items_final_order);
      expect(CheckoutStepTwoPage.paymentInformationText).toBe(PAYMENT_INFO);
      expect(CheckoutStepTwoPage.shippingInformationText).toBe(SHIPPING_INFO);
      expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.CHECKOUT_TWO);
      CheckoutStepTwoBehaviour.validateTotals();
      expect(CheckoutStepTwoPage.tax).toBe(1.44);
      expect(CheckoutStepTwoPage.total).toBe(19.42);
      expect(CheckoutStepTwoPage.subtotal).toBe(17.98);
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.CHECKOUT_STEP_TWO);
    });

    it(`should complete the purchase successfully`, () => {
      //ACTIONS
      CheckoutStepTwoPage.clickFinishButton();
      //ASSERTIONS
      expect(CheckoutCompletePage.header.isCartBadgeDisplayed(false)).not.toBeDisplayed();
      expect(CheckoutCompletePage.checkmarkIcon).toBeDisplayed();
      expect(CheckoutCompletePage.thankYouHeaderText).toBe(CONSTANTS.MESSAGE.PURCHASE_COMPLETE.HEADER);
      expect(CheckoutCompletePage.thankYouBodyText).toBe(CONSTANTS.MESSAGE.PURCHASE_COMPLETE.BODY);
      expect(CheckoutCompletePage.homeButton).toBeDisplayed();
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.CHECKOUT_COMPLETE);
    });

    it(`should go back to inventory page (using the Back Home button)`, () => {
      //ACTIONS
      CheckoutCompletePage.clickHomeButton();
      //ASSERTIONS
      InventoryBehaviour.expectToBeInBaseState();
      expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.INVENTORY);
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.INVENTORY);
    });
  });
});