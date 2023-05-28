class Sidebar {

  waitForComponentElements(): void{
    this.inventorySidebarLink.waitForDisplayed();
    this.aboutSidebarLink.waitForDisplayed();
    this.logoutSidebarLink.waitForDisplayed();
    this.resetSidebarLink.waitForDisplayed();
  }

  get inventorySidebarLink(): WebdriverIO.Element {
      const elem = $('[id="inventory_sidebar_link"]');
      elem.waitForDisplayed();
      return elem;
  }

  get aboutSidebarLink(): WebdriverIO.Element {
    const elem = $('[id="about_sidebar_link"]');
    elem.waitForDisplayed();
    return elem;
  }

  get logoutSidebarLink(): WebdriverIO.Element {
    const elem = $('[id="logout_sidebar_link"]');
    elem.waitForDisplayed();
    return elem;
  }

  get resetSidebarLink(): WebdriverIO.Element {
    const elem = $('[id="reset_sidebar_link"]');
    elem.waitForDisplayed();
    return elem;
  }

  get inventorySidebarLinkValue(): string {
    return this.inventorySidebarLink.getAttribute('href');
  }

  get aboutSidebarLinkValue(): string {
    return this.aboutSidebarLink.getAttribute('href');
  }

  get logoutSidebarLinkValue(): string {
    return this.logoutSidebarLink.getAttribute('href');
  }

  get closeSidebarButton(): WebdriverIO.Element {
    const elem = $('[id="react-burger-cross-btn"]');
    elem.waitForClickable();
    return elem;
  }
    
  closeSidebar(): void {
    this.closeSidebarButton.click();
  }

  clickInventorySidebarLink(): void {
    this.inventorySidebarLink.click();
  }

  clickAboutSidebarLink(): void {
    this.aboutSidebarLink.click();
  }

  clickLogoutSidebarLink(): void {
    this.logoutSidebarLink.click();
  }

  resetAppState(): void {
    this.resetSidebarLink.click();
  }

}

export default new Sidebar;
