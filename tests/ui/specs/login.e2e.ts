//PAGE OBJECTS
import LoginPage from '../page-objects/login.page';

//BEHAVIOUR PATTERNS
import LoginBehaviour from '../behaviour-patterns/login.behaviour';

//CONSTANTS
import CONSTANTS from "../constants";

// TEST DATA
const users = [
  CONSTANTS.USER.LOCKED_OUT,
  CONSTANTS.USER.INVALID_ONE,
  CONSTANTS.USER.INVALID_TWO,
  CONSTANTS.USER.INVALID_THREE,
]

users.forEach(({USERNAME, PASSWORD, MESSAGE}) =>{
  describe(`#003: Login with invalid user for "${USERNAME}" user`, () => {
    
    before(function() {
      LoginPage.open();
    });

    it(`should receive an error message: "${MESSAGE}"`, () => {
      //ACTIONS
      LoginBehaviour.login(USERNAME, PASSWORD);
      //ASSERTIONS
      expect(LoginPage.errorMessage).toBeDisplayed();
      expect(LoginPage.errorMessageText).toBe(MESSAGE);
      expect(browser.getUrl()).toContain(CONSTANTS.SAUCE_DEMO_URL.BASE);
    });
  });
});