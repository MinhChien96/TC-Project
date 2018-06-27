import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../service/question.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  arrSub = [];
  selectSub:any;
  arrQues = [];
  constructor(private questionService: QuestionService) { }

  async ngOnInit() {
    this.getAllSub();
  }

  async getAllSub(){
    try {
      let result = await this.questionService.getAllSub();
      if(result.success){
        this.arrSub = result.data;
      }
      else {throw Error("Cannot connect to server")}
    } catch (err) {
      console.log(err);
      alert("Cannot connect to server");
    }
  }
  async changeSub(){
    try {
      let result = await this.questionService.getAllQuesBySub(this.selectSub);
      if(result.success){
        this.arrQues = result.data;
        //console.log(this.arrQues);
      }
      else {throw Error()}
    } catch (error) {
      console.log(error);
      alert("Cannot connect to server");
    }
  }

}
