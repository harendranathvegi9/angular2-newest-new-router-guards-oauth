import { provide } from '@angular/core';
import {
  beforeEachProviders,
  inject,
  beforeEach,
  it
} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';

import { FlightCardComponent } from './flight-card.component';
import { FlightService } from '../services/flight.service';

describe('Flight Card', () => {
  
  let sut;
  let tcbPromise;
  let element;
  let fakeFlight = { id: 1, from: "Graz", to: "Hamburg", date: new Date().toISOString()};
  
  beforeEachProviders(() => [
    TestComponentBuilder,
    FlightCardComponent,
    provide(FlightService, ({
      useValue: {}
    }))
  ]);
  
  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcbPromise = _tcb.createAsync(FlightCardComponent).then(fixture => {
      sut = fixture.componentInstance;
      element = fixture.nativeElement;

      sut.item = fakeFlight;
      fixture.detectChanges();
      return fixture;
    });    
  }))
  
  it('should accept a flight as input parameter', (done) => {
    tcbPromise.then((fixture) => {
      expect(fixture.nativeElement.querySelector("h2").innerText)
        .toBe("Graz - Hamburg");

      fixture.componentInstance.item = { id: 2, from: "Hamburg", to: "Graz", date: new Date().toISOString()};
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector("h2").innerText)
        .toBe("Hamburg - Graz");
      done();
    });
  });
   
  it('should emit new output value from EventEmitter', done => {
    tcbPromise.then((fixture) => {
      sut.selectedItemChange.subscribe(newFlight => { 
        expect(newFlight).toBe(fakeFlight);
        done();
      });
      sut.select();
    });
  });
}) 