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
  arrQues = [];//mang question
  idNumQues = 1;//id cau hoi
  timeSpent = 0;
  ques: any = "";//cau hoi hien tai
  selectAnwser = "";//dap an chon
  arrAnwser = [];//mang cau tl

  //
  // arrNumQues = [];
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

  //khởi tạo arranw
  InitArrAnw(){
    for(let i = 0;i<20;i++){
      this.arrAnwser.push({
        num:i+1,
        idquestion:this.arrQues[i].idquestion,
        idanwser:""
      })
    }
  }
  async ngOnInit() {
    await this.getAllQues();
    this.InitArrAnw();
    this.ques = this.arrQues[0];
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
    if (this.idNumQues <= 20) {
      this.arrAnwser[this.idNumQues-1].idanwser = this.selectAnwser;
      this.ques = this.arrQues[this.idNumQues];
      this.idNumQues++;
    }
    else {
      this.checkResult();
    }
    this.selectAnwser = "";
  }

  selectQues(num){
    this.ques = this.arrQues[num-1];
    this.idNumQues = num;
    this.selectAnwser = "";
  }

  async checkResult() {
    try {
      //console.log(this.arrAnwser);alert("waiting");
      this.cookieService.set('arrAnwser', JSON.stringify(this.arrAnwser), Date.now() + 86400000);
      this.arrAnwser.push({timespent:this.timeSpent});
      let result = await this.quizService.checkResult(this.arrAnwser);
      //console.log(JSON.stringify(result));
      if(!result.success){
        alert("Cannot send result");
        return;
      }
      let value = {point:result.data,timeSpent:this.timeSpent};
      this.cookieService.set('result', JSON.stringify(value));
      this.routes.navigate(["/result"]);
    } catch (error) {
      console.log(error);
    }
  }
}
