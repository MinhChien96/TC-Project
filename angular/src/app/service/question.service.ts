import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class QuestionService {
    constructor(private http: Http, private cookieService: CookieService) {
        var authToken = this.cookieService.get('token');
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + authToken,
        });
    }
    headers: Headers;
    async getAllSub(){
        let result = await this.http.get('https://tcquiz.herokuapp.com/api/subject',{headers:this.headers}).toPromise();
        return result.json()
    }
    async getAllQuesBySub(idsub){
        let result = await this.http.get('https://tcquiz.herokuapp.com/api/question/'+idsub,{headers:this.headers}).toPromise();
        return result.json()
    }
}