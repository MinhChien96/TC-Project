import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  constructor(private quizService: QuizService, private cookieService: CookieService, private routes: Router) { }
  arrQues = [];
  idNumQues = 1;
  timeSpent = 0;
  ques: any = "";
  selectAnwser = "";
  arrAnwser = [];

  async getAllQues() {
    try {
     var result = await this.quizService.getAll();
       //console.log(result);
        if (!result.success) {
          alert('Connot get question, sever is busy...');
          return;
        }
        this.arrQues = result.data;
      //console.log(this.arrQues);
    } catch (error) {
      alert('Cannot connect to server....');
      console.log(error);
    }
  }

  async ngOnInit() {
    await this.getAllQues();
    this.ques = this.arrQues.shift();
    //console.log(this.ques)
    setInterval(() => {
      if (this.timeSpent >= 1200) {
        //time out do something
        this.checkResult();
      }
      this.timeSpent++;
    }, 1000);
  }
  nextQuiz() {
    //alert(this.selectAnwser);
    if (this.arrQues.length != 0) {
      this.arrAnwser.push({ idquestion: this.ques.idquestion, idanwser: this.selectAnwser });
      this.ques = this.arrQues.shift();
      this.idNumQues++;
    }
    else {
      this.checkResult();
    }
    this.selectAnwser = "";
  }
  async checkResult() {
    try {
      //console.log(this.arrAnwser);alert("waiting");
      this.cookieService.set('arrAnwser', JSON.stringify(this.arrAnwser), Date.now() + 86400000);
      let result = await this.quizService.checkResult(this.arrAnwser);
      //console.log(JSON.stringify(result));
      let value = {point:result.data,timeSpent:this.timeSpent};
      this.cookieService.set('result', JSON.stringify(value), Date.now() + 86400000);
      this.routes.navigate(["/result"]);
    } catch (error) {
      console.log(error);
    }
  }
}
