class Header {

  waitForComponentElements(): boolean{
    this.burgerButton.waitForDisplayed();
    this.title.waitForDisplayed();
    this.cart.waitForDisplayed();
    return true;
  }

  get primaryHeader(): WebdriverIO.Element {
    const elem = $('[class="header_primary_container"]');
    elem.waitForDisplayed();
    return elem;
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

  get cartLink(): WebdriverIO.Element {
    return this.cart.$('[class="shopping_cart_link"]');
  }

  openCart(): void {
    this.cartLink.click();
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

  get secondaryHeaderTitle(): WebdriverIO.Element {
    const elem = $('[class="header_secondary_container"]').$('[class="title"]');
    elem.waitForDisplayed();
    return elem;
  }

  get secondaryHeaderButton(): WebdriverIO.Element {
    const elem = $('[class="header_secondary_container"]').$('button');
    elem.waitForDisplayed();
    return elem;
  }

  get secondaryTitleText(): string {
    return this.secondaryHeaderTitle.getText();
  }

  get secondaryButtonText(): string {
    return this.secondaryHeaderButton.getText();
  }

}

export default new Header;
