import {Pipe, PipeTransform} from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Pipe({
  name: 'format',
  pure: false
})
export class FormatPipe implements PipeTransform {
  private pipeResult: string = '';
  private observableSubscription: Subscription;

  public transform(value: Observable<any>, ...args: string[]): any {
    if (!this.observableSubscription && value) {
      this.observableSubscription = value.subscribe( (result) => {
        if (args.length) {
          this.pipeResult = result;
          args.forEach( (tag) => {
            this.pipeResult = `<${tag}>${this.pipeResult}</${tag}>`;
          });
        } else {
          this.pipeResult = `<b>${result}</b>`;
        }
      });
    }

    return this.pipeResult;
  }
}