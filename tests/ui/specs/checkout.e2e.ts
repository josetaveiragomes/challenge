//PAGE OBJECTS
import LoginPage from '../page-objects/login.page';
import InventoryPage from '../page-objects/inventory.page';
import CheckoutStepOnePage from '../page-objects/checkout-step-one.page';

//BEHAVIOUR PATTERNS
import LoginBehaviour from '../behaviour-patterns/login.behaviour';
import InventoryBehaviour from '../behaviour-patterns/inventory.behaviour';
import CheckoutStepOneBehaviour from '../behaviour-patterns/checkout-step-one.behaviour';

//CONSTANTS
import CONSTANTS from "../constants";

//TEST DATA
const test_data = [
  {
    CASE: "Empty First Name",
    FIRST_NAME: CONSTANTS.EMPTY_STRING,
    LAST_NAME: "Ultimo",
    POSTAL_CODE: "4000-000",
    MESSAGE: CONSTANTS.MESSAGE.ERROR.MISSING_FIRST_NAME,
  },
  {
    CASE: "Empty Last Name",
    FIRST_NAME: "Primeiro",
    LAST_NAME: CONSTANTS.EMPTY_STRING,
    POSTAL_CODE: "4000-000",
    MESSAGE: CONSTANTS.MESSAGE.ERROR.MISSING_LAST_NAME,
  },
  {
    CASE: "Empty Postal Code",
    FIRST_NAME: "Primeiro",
    LAST_NAME: "Ultimo",
    POSTAL_CODE: CONSTANTS.EMPTY_STRING,
    MESSAGE: CONSTANTS.MESSAGE.ERROR.MISSING_POSTAL_CODE,
  },
  {
    CASE: "Invalid First Name",
    FIRST_NAME: "12345",
    LAST_NAME: "Ultimo",
    POSTAL_CODE: "4000-000",
    MESSAGE: CONSTANTS.MESSAGE.ERROR.INVALID_FIRST_NAME,
  },
  {
    CASE: "Invalid Last Name",
    FIRST_NAME: "Primeiro",
    LAST_NAME: "12345",
    POSTAL_CODE: "4000-000",
    MESSAGE: CONSTANTS.MESSAGE.ERROR.INVALID_LAST_NAME,
  },
  {
    CASE: "Invalid Postal Code",
    FIRST_NAME: "Primeiro",
    LAST_NAME: "Ultimo",
    POSTAL_CODE: "batatas",
    MESSAGE: CONSTANTS.MESSAGE.ERROR.INVALID_POSTAL_CODE,
  },
]

test_data.forEach(({FIRST_NAME, LAST_NAME, POSTAL_CODE, MESSAGE, CASE}) =>{
  describe(`#020 & #021: Checkout Step One for "${CASE}"`, () => {
    
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

    it(`should go to checkout page step 1`, () => {
      //ACTIONS
      CheckoutStepOnePage.open();
      //ASSERTIONS
      expect(CheckoutStepOnePage.checkoutInfo).toBeDisplayed();
      expect(CheckoutStepOnePage.firstNameInputValue).toBe(CONSTANTS.EMPTY_STRING);
      expect(CheckoutStepOnePage.lastNameInputValue).toBe(CONSTANTS.EMPTY_STRING);
      expect(CheckoutStepOnePage.postalCodeInputValue).toBe(CONSTANTS.EMPTY_STRING);
      expect(InventoryPage.header.secondaryTitleText).toBe(CONSTANTS.HEADER.CHECKOUT_ONE);
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.CHECKOUT_STEP_ONE);
    });
    it(`should get the following error message: "${MESSAGE}"`, () => {
      //ACTIONS
      CheckoutStepOneBehaviour.fillForm(FIRST_NAME, LAST_NAME, POSTAL_CODE);
      CheckoutStepOnePage.clickContinueButton();
      //ASSERTIONS
      expect(CheckoutStepOnePage.errorMessageText).toBe(MESSAGE); //FAILS HERE FOR INVALID NAMES AND POSTAL CODE
      expect(browser.getUrl()).toBe(CONSTANTS.SAUCE_DEMO_URL.BASE + CONSTANTS.SAUCE_DEMO_URL.CHECKOUT_STEP_ONE);
    });
  });
});