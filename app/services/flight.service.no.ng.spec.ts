import { Observable, Observer} from 'rxjs';

import { OAuthService} from 'angular2-oauth2/oauth-service';
import { FlightService } from './flight.service';
import { Flight } from '../entities/flight';

class FakeHttp {
  private fakeResponse: Flight[] = [
    <Flight>{ id: 1, from: "Graz", to: "Hamburg", date: new Date().toISOString()},
    <Flight>{ id: 2, from: "Hamburg", to: "Graz", date: new Date().toISOString()}
  ];

  get(url: string, options: any) {
    
    return {
      map: (response: any) => {
        return new Observable( (obs) => {
          obs.next([this.fakeResponse[0]]);
          obs.complete();
        });
      }
    }
  }
}

describe("Flight Service", () => {
  let service: FlightService;

  beforeEach(() => {
    service = new FlightService(
      <any>new FakeHttp(),
      <OAuthService>{ getAccessToken: () => "TESTTOKEN"},
      "API/DEMO");
  });

  it("should return flights when searched", (done) => {
    service.find("Graz", "Hamburg").subscribe( (flights: Flight[]) => {
      expect(flights.length).toBe(1);
      done();
    });
  })
});