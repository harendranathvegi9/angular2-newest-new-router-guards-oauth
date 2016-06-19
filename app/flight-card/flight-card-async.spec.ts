import { provide } from '@angular/core';
import {
  beforeEachProviders,
  injectAsync,
  beforeEach,
  it
} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';

import { FlightCardComponent } from './flight-card.component';
import { FlightService } from '../services/flight.service';

describe('Flight Card', () => {
  
  let sut;
  let fixture;
  let element;
  let fakeFlight = { id: 1, from: "Graz", to: "Hamburg", date: new Date().toISOString()};
  
  
  beforeEachProviders(() => [
    TestComponentBuilder,
    FlightCardComponent,
    provide(FlightService, ({
      useValue: {}
    }))
  ]);
  
  beforeEach(injectAsync([TestComponentBuilder], _tcb => {
    return _tcb.createAsync(FlightCardComponent).then(_fixture => {
      fixture = _fixture;
      sut = fixture.componentInstance;
      element = fixture.nativeElement;

      sut.item = fakeFlight;
      fixture.detectChanges();
      
      return fixture;
    });    
  }))
  
  it('should accept a flight as input parameter', () => {
    expect(element.querySelector("h2").innerText)
      .toBe("Graz - Hamburg");

    sut.item = { id: 2, from: "Hamburg", to: "Graz", date: new Date().toISOString()};
    fixture.detectChanges();

    expect(element.querySelector("h2").innerText)
      .toBe("Hamburg - Graz");
  });
   
  it('should emit new output value from EventEmitter', (done) => {
    sut.selectedItemChange.subscribe(newFlight => { 
      expect(newFlight).toBe(fakeFlight);
      done();
    });
    sut.select();
  });
}) 