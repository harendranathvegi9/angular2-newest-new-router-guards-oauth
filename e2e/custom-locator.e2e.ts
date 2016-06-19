by.addLocator('navigationTabText',
    function(tabText, opt_parentElement, opt_rootSelector) {
  var using = opt_parentElement || document,
      navElements = using.querySelectorAll('ul.navbar-nav li a');

  return Array.prototype.filter.call(navElements, function(navItem) {
    return navItem.textContent.indexOf(tabText) >= 0;
  });
});

describe("Custom locator", () => {
  it("should find navigation items by using a custom locator", () => {
    browser.get("http://localhost:8080");
    element((<any>by).navigationTabText('Book ')).click();    
  });
});