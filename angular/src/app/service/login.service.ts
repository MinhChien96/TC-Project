import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import {CookieService} from 'ngx-cookie-service'

@Injectable()
export class LoginService {

  constructor(private http: Http,private cookieService: CookieService) { }

  // login(userName:string,passWord:string){
  //   return this.http.post('https://tcquiz.herokuapp.com/api/user/login',{userName: userName,passWord: passWord})
  //   .toPromise()
  //   .then(res=>res.json())
  //   .then(resJson => resJson.success);
  // }
  async login(userName:string,passWord:string){
    try {
      const res = await this.http.post('https://tcquiz.herokuapp.com/api/user/login',{userName: userName,passWord: passWord}).toPromise();
      let result = res.json();
      if(result.success){
        this.cookieService.set('token',result.data.token,result.data.exp);
        if(result.data.point!=-1)
        this.cookieService.set('result',JSON.stringify({point:result.data.point,timeSpent:result.data.timespent}));
        return result.data.level;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}
