import Behaviour from './behaviour'
import CheckoutStepOnePage from '../page-objects/checkout-step-one.page';

class CheckoutStepOneBehaviour extends Behaviour {

  fillForm(firstName: string, lastName: string, postalCode: string){
    CheckoutStepOnePage.firstNameInput.setValue(firstName);
    CheckoutStepOnePage.lastNameInput.setValue(lastName);
    CheckoutStepOnePage.postalCodeInput.setValue(postalCode);

    expect(CheckoutStepOnePage.firstNameInputValue).toBe(firstName);
    expect(CheckoutStepOnePage.lastNameInputValue).toBe(lastName);
    expect(CheckoutStepOnePage.postalCodeInputValue).toBe(postalCode);
  }
}
export default new CheckoutStepOneBehaviour(CheckoutStepOnePage);