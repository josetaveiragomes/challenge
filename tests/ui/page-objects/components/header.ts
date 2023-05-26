class Header {

  waitForComponentElements(): boolean{
    this.burgerButton.waitForDisplayed();
    this.title.waitForDisplayed();
    this.cart.waitForDisplayed();
    return true;
  }

  get title(): WebdriverIO.Element {
    const elem = $('[class="header_label"]').$('[class="app_logo"]');
    elem.waitForDisplayed();
    return elem;
  }

  get titleText(): string {
    return this.title.getText();
  }

  get burgerButton(): WebdriverIO.Element {
    const elem = $('[id="react-burger-menu-btn"]');
    elem.waitForDisplayed();
    return elem;
  }

  get cart(): WebdriverIO.Element {
    const elem = $('[id="shopping_cart_container"]');
    elem.waitForDisplayed();
    return elem;
  }

  get cartBadge(): WebdriverIO.Element {
    const elem = this.cart.$('[class="shopping_cart_badge"]');
    elem.waitForDisplayed();
    return elem;
  }

  get cartBadgeText(): string {
    return this.cartBadge.getText();
  }

  isCartBadgeDisplayed(value: boolean): boolean {
    const elem = this.cart.$('[class="shopping_cart_badge"]');
    elem.waitForDisplayed({reverse: !value});
    return value;
  }

}

export default new Header;
