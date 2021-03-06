import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class IResultService implements CanActivate {

    constructor(private router: Router, private cookieService: CookieService) { }

    canActivate(): boolean {
        if (this.cookieService.get('result') != "") { this.router.navigate(['/result']); return false; }
        return true;
    }
}
