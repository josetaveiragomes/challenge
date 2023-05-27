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

  resetAppState(): void {
    this.resetSidebarLink.click();
  }

}

export default new Sidebar;
