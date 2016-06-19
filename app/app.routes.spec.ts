import { 
  provide,
  Injector,
  ComponentResolver,
  Component
} from '@angular/core';

import {
  beforeEachProviders,
  inject,
  beforeEach,
  fakeAsync,
  it,
  tick
} from '@angular/core/testing'

import { Location } from '@angular/common';
import {TestComponentBuilder} from '@angular/compiler/testing';

import {
  ROUTER_DIRECTIVES,
  Router,
  UrlSerializer,
  RouterOutletMap,
  DefaultUrlSerializer,
  ActivatedRoute
} from '@angular/router';

import {SpyLocation} from '@angular/common/testing/location_mock';

import {OAuthService} from 'angular2-oauth2/oauth-service';
import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';

// Fake alternative of the root component
@Component({
  selector: 'root-cmp',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
class RootCmp {}

describe('Router tests', () => {
  var location, router;
  
  //setup
  beforeEachProviders(() => [
    provide( OAuthService, {
      useValue: {
        tryLogin: (opts: any) => { return null; },
        getAccessToken: () => "TESTTOKEN",
        getIdentityClaims: () => { return { given_name: "Max Mustermann" }; }
      }
    }),
    RouterOutletMap,
    {provide: UrlSerializer, useClass: DefaultUrlSerializer},
    {
      provide: Router,
      useFactory: (resolver: ComponentResolver,
                   urlSerializer: UrlSerializer,
                   outletMap: RouterOutletMap,
                   location: Location,
                   injector: Injector) => {
        const r = new Router(AppComponent,
                             resolver,
                             urlSerializer,
                             outletMap,
                             location,
                             injector,
                             APP_ROUTES);
        r.initialNavigation();
        return r;
      },
      deps: [ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector]
    },
    provide(Location, {useClass: SpyLocation}),
    {provide: ActivatedRoute, useFactory: (r: Router) => r.routerState.root, deps: [Router]},
  ]);
  
  beforeEach(inject([Router, Location], (r, l) => {
    router = r;
    location = l;
  }));
  
  //specs
  it('should navigate with a provided config',
    fakeAsync(inject([Router, TestComponentBuilder, Location], (router:Router, tcb:TestComponentBuilder, location:Location) => {
      const fixture = tcb.createFakeAsync(AppComponent);
      console.log(fixture.componentInstance)
      tick();
      fixture.detectChanges();

      router.navigateByUrl('/home');
      tick();
      fixture.detectChanges();


      expect(location.path()).toEqual('/home');
    })));
});

