import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class QuizService {

    private apiUrl = "http://5ac59570a79a110014ce678b.mockapi.io/quiz/dapan/";
    constructor(private http:Http) { }
  
    getQuiz():Observable<any[]>{
      return this.http.get(this.apiUrl).map(res => res.json());
    }
  
    updateQuiz(id: number, data:object):Observable<any>{
      return this.http.put(this.apiUrl + id, data).map(res => res.json());
    }
  
  }