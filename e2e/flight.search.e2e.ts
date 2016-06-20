import { AppPageObject } from "./app.po";

describe("Flight search", () => {
  it("should search for a flight", () => {
    let po: AppPageObject = new AppPageObject();
    po.performLogin()
      .then( () => {
        let bookingLink = element(by.linkText("Book a Flight"));
        bookingLink.click();

        po.waitForElement("flight-search");
        let btnSearch = element(by.buttonText("Search!"));
        btnSearch.click();

        po.waitForElement("flight-card");

        expect(element.all(by.css("flight-card")).count()).toBe(5);
      });

  });
});