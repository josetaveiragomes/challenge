import Behaviour from './behaviour'
import InventoryPage from '../page-objects/inventory.page';
import CONSTANTS from "../constants";

class InventoryBehaviour extends Behaviour {

  items_az_order = [
    CONSTANTS.ITEM.BACKPACK,
    CONSTANTS.ITEM.BIKE_LIGHT,
    CONSTANTS.ITEM.BOLT_TSHIRT,
    CONSTANTS.ITEM.FLEECE_JACKET,
    CONSTANTS.ITEM.ONESIE,
    CONSTANTS.ITEM.RED_TSHIRT,
  ]

  items_za_order = [
    CONSTANTS.ITEM.RED_TSHIRT,
    CONSTANTS.ITEM.ONESIE,
    CONSTANTS.ITEM.FLEECE_JACKET,
    CONSTANTS.ITEM.BOLT_TSHIRT,
    CONSTANTS.ITEM.BIKE_LIGHT,
    CONSTANTS.ITEM.BACKPACK,
  ]

  selectFilter(option: string): void {
    InventoryPage.filter.click();
    InventoryPage.selectFilterOption(option);
  }

  addItemToCart(name: string): void {
    expect(InventoryPage.itemButton(InventoryPage.getItemByName(name)).getText()).toBe(CONSTANTS.BUTTON.ADD_TO_CART);
    InventoryPage.itemButton(InventoryPage.getItemByName(name)).click();
    expect(InventoryPage.itemButton(InventoryPage.getItemByName(name)).getText()).toBe(CONSTANTS.BUTTON.REMOVE);
  }

  openItem(name: string): void {
    InventoryPage.itemTitleLink(InventoryPage.getItemByName(name)).click();
  }

  expectToBeInBaseState(): void {
    this.expectHeaderToBeInBaseState();
    this.expectFooterToBeInBaseState();
    this.expectItemsToBeInAlphabeticalOrder();
    expect(InventoryPage.filterText).toBe(CONSTANTS.FILTER.AZ.TEXT);
  }

  expectItemsToBeInAlphabeticalOrder(): void {
    this.expectItemsToBeInOrder(this.items_az_order);
  }

  expectItemsToBeInReverseAlphabeticalOrder(): void {
    this.expectItemsToBeInOrder(this.items_za_order);
  }

  expectItemsToBeInOrder(order_array: any): void {
    const items = InventoryPage.items
    for (let i = 0; i < items.length; i++){
      expect(InventoryPage.itemId(items[i])).toBe(order_array[i].ID);
    }
  }

}

export default new InventoryBehaviour(InventoryPage);