import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuizService {

  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    var authToken = this.cookieService.get('token');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + authToken,
    });

    //console.log(authToken);
  }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Authorization': 'bearer '+this.authToken,
  //   })
  // };
  // headers= new HttpHeaders({
  //   'Content-Type':  'application/json',
  //   'Authorization': 'bearer '+this.authToken,
  // })
  async getAll() {
    let res = await this.http.get('http://localhost:3000/api/question/', { headers: this.headers }).toPromise();
    // console.log(res);
    // console.log(res.json());
    return res.json();
  }

  // createAuthorizationHeader(): Headers {
  //   let access_token = this.cookieService.get('token');
  //   let headers = new Headers({
  //     'Authorization': 'Bearer ' + access_token,
  //     'Content-Type': 'application/json;charset=UTF-8'
  //   });
  //   return headers;
  // }

  // public getAll(): any {
  //   console.log(this.http);
  //   return this.http.get('http://localhost:3000/api/question', {
  //     headers: this.createAuthorizationHeader()
  //   }).toPromise();
  // }

  async checkResult(arrAnwser) {
    let res = await this.http.post('http://localhost:3000/api/question/checkResult',arrAnwser ,{ headers: this.headers }).toPromise();
    // console.log(res);
    // console.log(res.json());
    return res.json();
  }
}