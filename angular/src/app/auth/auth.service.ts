import { Injectable } from '@angular/core';
// import { JwtHelperService  } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthService {

  constructor(private cookieService:CookieService ) {}

  // ...
  public isAuthenticated(): boolean {

    const token = this.cookieService.get('token');
    if(token=="")return false;
    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    return true;
  }
}