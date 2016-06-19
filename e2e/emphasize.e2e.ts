describe('test the emphasize attribute', function() {
  let startBorder: string = "1px solid rgb(204, 204, 204)";

  beforeEach( () => {
    // fresh navigation to page to guarantee no side effects
    browser.get('http://localhost:8080');
  });

  it('should emphasize the login button', function() {
    let btnLogin = element.all(by.css('button')).get(0);
    expect((<any>btnLogin).getCssValue("border-top")).toBe(startBorder);
    browser.actions().mouseMove(<any>btnLogin).perform();
    expect((<any>btnLogin).getCssValue("border-top")).toBe("2px solid rgb(0, 0, 255)");

    browser.actions().mouseMove(<any>element(by.css('body'))).perform();
    expect((<any>btnLogin).getCssValue("border-top")).toBe(startBorder);
  });

  it('should emphasize the logout button', function() {
    let btnLogout = element.all(by.css('button')).get(1);
    expect((<any>btnLogout).getCssValue("border-top")).toBe(startBorder);
    browser.actions().mouseMove(<any>btnLogout).perform();
    expect((<any>btnLogout).getCssValue("border-top")).toBe("2px solid rgb(255, 165, 0)");

    browser.actions().mouseMove(<any>element(by.css('body'))).perform();
    expect((<any>btnLogout).getCssValue("border-top")).toBe(startBorder);
  });
});