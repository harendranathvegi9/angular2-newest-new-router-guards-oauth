import { Component } from '@angular/core';
import { OAuthService} from 'angular2-oauth2/oauth-service';
import { Emphasize } from '../shared/emphasize.directive';
import { KebabCasePipe } from '../pipes/kebab-case.pipe';

@Component({
    selector: 'home',
    template: require('./home.component.html'),
    directives: [Emphasize],
    pipes: [KebabCasePipe]
})
export class HomeComponent {

    constructor(private oauthService: OAuthService) {
    }

    public login() {
        this.oauthService.initImplicitFlow();
    }

    public logout() {
        this.oauthService.logOut();
    }

    public get userName() {
        
        var claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;

        return claims.given_name;
    }

}