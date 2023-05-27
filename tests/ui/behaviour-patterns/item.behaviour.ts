import ItemPage from '../page-objects/item.page';

class ItemBehaviour {

  validateItemDetails(item: any): void {
    expect(ItemPage.itemTitleText).toBe(item.TITLE);
    expect(ItemPage.itemPriceText).toBe(item.PRICE);
    expect(ItemPage.itemImageText).toBe(item.IMAGE);
    expect(ItemPage.itemDescriptionText).toBe(item.DESCRIPTION);
  }

}

export default new ItemBehaviour;