import { Observable } from 'rxjs';

export let myCustomMatchers = {
  // toBeEmphasized matcher
  // Usage: expect(age).toBeEmphasized();
  //        expect(age).not.toBeEmphasized();
  toBeEmphasized: () => ({
    compare: (seats: Observable<) => {
      let result = {};
      result.pass = age>16;

      if (result.pass) {
        result.message = `Expected ${age} to be allowed to drive`;
      } else {
        result.message = `Expected ${age} to be allowed to drive, but it was not`;
      }
      return result;
    }
  }) 
};