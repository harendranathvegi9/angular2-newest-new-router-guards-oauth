import {Pipe, PipeTransform} from '@angular/core';

const KEBAB_REGEX: RegExp = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
const REVERSE_REGEX: RegExp = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g;

@Pipe({
  name: 'kebabCase'
})
export class KebabCasePipe implements PipeTransform {
  

  public transform(value: string, ...args: string[]): any {
    if (args.length === 1 && args[0] === "reverse") {
      return this.reverse(value);
    }

    return this.kebabCase(value);
  }

  private kebabCase(str) {
    return str.replace(KEBAB_REGEX, function (match) {
      return '-' + match.toLowerCase();
    });
  };

  private reverse(str) {
    return str.replace(REVERSE_REGEX, function (match) {
      return match.slice(1).toUpperCase();
    });
  };
}