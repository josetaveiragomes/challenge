import Behaviour from './behaviour'
import CartPage from '../page-objects/cart.page';
import CONSTANTS from "../constants";

class CartBehaviour extends Behaviour {

  removeItem(name: string): void {
    expect(CartPage.itemButton(CartPage.getItemByName(name)).getText()).toBe(CONSTANTS.BUTTON.REMOVE);
    CartPage.itemButton(CartPage.getItemByName(name)).click();
  }

  expectItemsToBeInOrder(order_array: any): void {
    const items = CartPage.items
    for (let i = 0; i < items.length; i++){
      expect(CartPage.itemId(items[i])).toBe(order_array[i].ID);
    }
  }

}

export default new CartBehaviour(CartPage);