import {FormatPipe} from './format.pipe';
import {Observable} from 'rxjs';

describe("Format pipe without NG helpers", () => {

  let sut;
  let obs;

  beforeEach(() => {
    sut = new FormatPipe();
    obs = new Observable( (obs) => {
      obs.next("DEMO");
      obs.complete();
    });
  });

  it("should format element with bold, when no params provided", () => {
    expect(sut.transform(obs)).toBe("<b>DEMO</b>");
  });

  it("should format element with given params", () => {
    expect(sut.transform(obs, 'i', 'b', 'u')).toBe("<u><b><i>DEMO</i></b></u>");
  });
});