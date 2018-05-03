import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Headers, ResponseContentType  } from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class IntervieweeService {

  
  constructor(private http: Http,private cookieService: CookieService) { 
    var authToken = this.cookieService.get('token');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + authToken,
    });
  }
  headers: Headers;
  async getUerById(id){
    let res = await this.http.get('http://localhost:3000/api/user/'+id, { headers: this.headers }).toPromise();
    return res.json();
  }

  async upLoadCv(formData){
    let res = await this.http.post('http://localhost:3000/api/user/upload/', formData, { headers: new Headers(
      {'Authorization': 'bearer ' + this.cookieService.get('token')})})
      .toPromise();
    return res.json();
  }

  async createInter(data){
    let res = await this.http.post('http://localhost:3000/api/user/signup', data, { headers: this.headers})
    .toPromise();
    return res.json();
  }

  async updateInter(data){
    let res = await this.http.post('http://localhost:3000/api/user/update', data, { headers: this.headers})
    .toPromise();
    return res.json();
  }

  async getCVByName(filename){
    let res = await this.http.get('http://localhost:3000/api/user/getcv/quidinhvietcode.pdf', { headers: this.headers,responseType: ResponseContentType.Blob})
    .map(res=>{
      //console.log(res);
      return new Blob([res.blob()], { type: 'application/pdf' });
    });
  }
  
  async deleteInter(arrID){
    let res = await this.http.post('http://localhost:3000/api/user/delete', arrID, { headers: this.headers})
    .toPromise();
    return res.json();
  }
}
