import { Observable } from 'rxjs';

interface CustomMatcherResult {
  pass: boolean;
  message: string;
}

export let myCustomMatchers: jasmine.CustomMatcherFactories = {
  // toBeEmphasized matcher
  // Usage: expect(element).toBeEmphasized({ border: '1px solid black', backgroundColor: 'yellow'});
  //        expect(element).not.toBeEmphasized({ border: '2px solid black', backgroundColor: 'green'});
  toBeEmphasized: (util, customEqualityTesters): jasmine.CustomMatcher => ({
    compare: (element: HTMLElement, expected) => {
      let result: jasmine.CustomMatcherResult = { pass: false, message: ""};

      result.pass = util.equals(element.style.border, expected.border, customEqualityTesters)
        && util.equals(element.style.backgroundColor, expected.backgroundColor, customEqualityTesters);

      if (result.pass) {
        result.message = `Expected element to have border [${expected.border}] and backgroundColor [${expected.backgroundColor}] matches`;
      } else {
        result.message = `Expected element to have border [${expected.border}] and backgroundColor [${expected.backgroundColor}] did not match`;
      }
      return result;
    }
  }) 
};