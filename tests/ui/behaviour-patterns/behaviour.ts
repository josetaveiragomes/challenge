import Page from '../page-objects/page';
import CONSTANTS from "../constants";

class Behaviour {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  expectHeaderToBeInBaseState(): void {
    expect(this.page.header.burgerButton).toBeDisplayed();
    expect(this.page.header.title).toBeDisplayed();
    expect(this.page.header.titleText).toBe(CONSTANTS.HEADER.WEBSITE_TITLE);
    expect(this.page.header.cart).toBeDisplayed();
    expect(this.page.header.isCartBadgeDisplayed(false)).not.toBeDisplayed();
  }

  expectFooterToBeInBaseState(): void {
    expect(this.page.footer.twitterSocial).toBeDisplayed();
    expect(this.page.footer.facebookSocial).toBeDisplayed();
    expect(this.page.footer.linkedinSocial).toBeDisplayed();
    expect(this.page.footer.twitterSocialLinkValue).toBe(CONSTANTS.SOCIAL.TWITTER.URL);
    expect(this.page.footer.facebookSocialLinkValue).toBe(CONSTANTS.SOCIAL.FACEBOOK.URL);
    expect(this.page.footer.linkedinSocialLinkValue).toBe(CONSTANTS.SOCIAL.LINKEDIN.URL);
    expect(this.page.footer.footerCopyText).toBe(CONSTANTS.FOOTER)
  }

}

export default Behaviour;