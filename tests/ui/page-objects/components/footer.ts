class Footer {

  waitForComponentElements(): boolean{
    this.footer.waitForDisplayed();
    this.twitterSocial.waitForDisplayed();
    this.facebookSocial.waitForDisplayed();
    this.linkedinSocial.waitForDisplayed();
    this.footerCopy.waitForDisplayed();
    return true;
  }

  get footer(): WebdriverIO.Element {
    const elem = $('[class="footer"]');
    elem.waitForDisplayed();
    return elem;
  }

  social(option: string): WebdriverIO.Element {
    const elem = this.footer.$(`[class="social_${option}"]`);
    elem.waitForDisplayed();
    return elem;
  }

  get twitterSocial(): WebdriverIO.Element {
    return this.social('twitter');
  }

  get facebookSocial(): WebdriverIO.Element {
    return this.social('facebook');
  }

  get linkedinSocial(): WebdriverIO.Element {
    return this.social('linkedin');
  }

  socialLink(option: string): string {
    return this.social(option).$('a').getAttribute('href');
  }

  get twitterSocialLink(): string {
    return this.socialLink('twitter');
  }

  get facebookSocialLink(): string {
    return this.socialLink('facebook');
  }

  get linkedinSocialLink(): string {
    return this.socialLink('linkedin');
  }

  get footerCopy(): WebdriverIO.Element {
    const elem = this.footer.$('[class="footer_copy"]');
    elem.waitForDisplayed();
    return elem;
  }

  get footerCopyText(): string {
    return this.footerCopy.getText();
  }

}

export default new Footer;
