import { AppPageObject } from "./app.po";

describe("login to page", () => {
  it("should properly login the user", (done) => {
    let po: AppPageObject = new AppPageObject();
    po.performLogin().then( () => {
      done();
    });
  });
});