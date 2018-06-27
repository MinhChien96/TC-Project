import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Http, Headers} from '@angular/http';

@Injectable()

export class IsAdminService implements CanActivate {

    constructor(private router: Router, private cookieService: CookieService, private http: Http) { }

    canActivate(): boolean {
        var token = this.cookieService.get('token');
        if (token == ""){
            this.router.navigate(['/login']);
            return false;
        };
        return true;
        
        
    }
    async check(token){
        var headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token,
        });
        var res = await this.http.get("https://tcquiz.herokuapp.com/api/user/isadmin",{headers: headers}).toPromise();
        return res.json();
        
    }
}