export class AppPageObject {
  performLogin(): webdriver.promise.Promise<void> {
    browser.get("http://localhost:8080");

    let btnLogin = element.all(by.css("button")).get(0);
    btnLogin.click();
    browser.waitForAngular();

    let txtUsername = element(by.id("username"));
    let txtPassword = element(by.id("password"));

    txtUsername.sendKeys("max");
    txtPassword.sendKeys("geheim");

    let btnLoginOauth = element(by.buttonText("Login"));
    btnLoginOauth.click();

    browser.waitForAngular();
    let btnAllow = element(by.buttonText("Yes, Allow"));
    return btnAllow.isPresent().then( (result) => {
      if (result) {
        btnAllow.click();
      }

      this.waitForElement("h1");
      expect(element(by.css("h1")).getText()).toBe("Hello, Max!");
    });
  }

  waitForElement(selector: any /** TODO #9100 */) {
    let EC = (<any>protractor).ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.css(selector))), 20000);
  }
}