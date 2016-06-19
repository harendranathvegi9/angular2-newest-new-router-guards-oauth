import { 
  Component,
  Output,
  EventEmitter
} from '@angular/core';

import {
  beforeEachProviders,
  injectAsync,
  beforeEach
} from '@angular/core/testing'

import {TestComponentBuilder} from '@angular/compiler/testing';

import { Emphasize } from './emphasize.directive';

@Component({ 
  selector: 'container',
  template: `<div emphasize></div>`,
  directives: [Emphasize]
})
export class Container {

}

function FireEvent( element: HTMLElement, eventName )
{
  var evObj = document.createEvent( 'Events' );
  evObj.initEvent( eventName, true, false );
  element.dispatchEvent( evObj );
}

describe('Directive: Emphasize', () => {
  let fixture;
  let container;
  
  //setup
  beforeEachProviders(() => [
    TestComponentBuilder
  ]);

  beforeEach(injectAsync([TestComponentBuilder], tcb => {
    return tcb
      .createAsync(Container)
      .then(f => fixture = f);
  }));
  
  //specs
  it('should apply default formats if none provided', () => {
    let container = fixture.componentInstance,
        div = fixture.nativeElement.querySelector('div');
    
    expect(div.style.border).toBe("");
    expect(div.style.backgroundColor).toBe("");

    // manually fire mouseenter
    FireEvent(div, "mouseenter");

    expect(div.style.border).toBe("2px solid orange");
    expect(div.style.backgroundColor).toBe("yellow");
  });
});