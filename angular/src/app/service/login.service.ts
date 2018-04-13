import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import{Http} from '@angular/http';


@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(userName:string,passWord:string){
    return this.http.post('http://localhost:3000/api/user/login',{userName: userName,passWord: passWord})
    .toPromise()
    .then(res=>res.json())
    .then(resJson => resJson.success);
  }
}
