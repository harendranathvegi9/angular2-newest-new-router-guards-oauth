import { MockBackend } from '@angular/http/testing';
import {
  HTTP_PROVIDERS,
  Http,
  Response,
  ResponseOptions,
  BaseRequestOptions,
  Headers
} from '@angular/http';

import { OAuthService} from 'angular2-oauth2/oauth-service';
import { FlightService } from './flight.service';
import { Flight } from '../entities/flight';

describe("Flight Service", () => {

  let mockbackend: MockBackend;
  let service: FlightService;

  beforeEach(() => {
    mockbackend = new MockBackend();
    service = new FlightService(
      new Http(mockbackend, new BaseRequestOptions()),
      <OAuthService>{ getAccessToken: () => "TESTTOKEN"},
      "API/DEMO");
  });

  it("should return flights when searched", (done) => {
    let fakeResponse: Flight[] = [
      <Flight>{ id: 1, from: "Graz", to: "Hamburg", date: new Date().toISOString()},
      <Flight>{ id: 2, from: "Hamburg", to: "Graz", date: new Date().toISOString()}
    ];
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");

    let responseOptions = new ResponseOptions( {
      body: JSON.stringify([fakeResponse[0]]),
      headers
    }); 

    mockbackend.connections.subscribe( connection => {
      connection.mockRespond(new Response(responseOptions));
    });

    service.find("Graz", "Hamburg").subscribe( (flights: Flight[]) => {
      expect(flights.length).toBe(1);
      done();
    });
  })
});