import Behaviour from './behaviour'
import CheckoutStepTwoPage from '../page-objects/checkout-step-two.page';

class CheckoutStepTwoBehaviour extends Behaviour {

  expectItemsToBeInOrder(order_array: any): void {
    const items = CheckoutStepTwoPage.items
    for (let i = 0; i < items.length; i++){
      expect(CheckoutStepTwoPage.itemId(items[i])).toBe(order_array[i].ID);
    }
  }

  getItemTotal(): number {
    var price = 0;
    const items = CheckoutStepTwoPage.items
    
    for (let i = 0; i < items.length; i++){
      const stringPrice = CheckoutStepTwoPage.itemPriceText(items[i]);
      price += parseFloat(stringPrice.substring(1));
    }

    return price;
  }

  validateTotals(): void {
    expect(this.getItemTotal()).toBe(CheckoutStepTwoPage.subtotal);
    expect(CheckoutStepTwoPage.subtotal + CheckoutStepTwoPage.tax).toBe(CheckoutStepTwoPage.total);
  }

}
export default new CheckoutStepTwoBehaviour(CheckoutStepTwoPage);