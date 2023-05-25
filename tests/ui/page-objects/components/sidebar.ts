class Sidebar {

  get inventorySidebarLink(): WebdriverIO.Element {
      const elem = $('[id="inventory_sidebar_link"]');
      elem.waitForClickable();
      return elem;
  }

  get aboutSidebarLink(): WebdriverIO.Element {
    const elem = $('[id="about_sidebar_link"]');
    elem.waitForClickable();
    return elem;
  }

  get logoutSidebarLink(): WebdriverIO.Element {
    const elem = $('[id="logout_sidebar_link"]');
    elem.waitForClickable();
    return elem;
  }

  get resetSidebarLink(): WebdriverIO.Element {
    const elem = $('[id="reset_sidebar_link"]');
    elem.waitForClickable();
    return elem;
  }

}

export default new Sidebar;
