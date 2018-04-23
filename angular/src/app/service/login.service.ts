import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import {CookieService} from 'ngx-cookie-service'

@Injectable()
export class LoginService {

  constructor(private http: Http,private cookieService: CookieService) { }

  // login(userName:string,passWord:string){
  //   return this.http.post('http://localhost:3000/api/user/login',{userName: userName,passWord: passWord})
  //   .toPromise()
  //   .then(res=>res.json())
  //   .then(resJson => resJson.success);
  // }
  async login(userName:string,passWord:string){
    try {
      const res = await this.http.post('http://localhost:3000/api/user/login',{userName: userName,passWord: passWord}).toPromise();
      let result = res.json();
      if(result.success){
        this.cookieService.set('token',result.data.token,result.data.exp);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}
