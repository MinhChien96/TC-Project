import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { Router } from '@angular/router'
import{IntervieweeService} from "../../service/interviewee.service";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

    constructor(private quizService :QuizService, private routes:Router,private intervieweeService : IntervieweeService) {
        
    }
    arrSelect = [];
    titleTable = [];
    tableData= [];
    ngOnInit() {
        this.titleTable = ['ID', 'Name', 'Birth', 'Adress','Gender','Point', 'Time Spent'];
        this.getUser();
    }
    async getUser(){
        try {
            let result = await this.quizService.getAllInter();
            if(result.success){
                this.tableData = result.data;
                // console.log(this.tableData);
            }
            else{
                throw Error('Only admin can use api');
            }
        } catch (error) {
            alert('Cannot connect server');
            console.log(error+'');
        }
    }
    timeClock(number){
        let hienthi = ('0' + Math.floor(number / 60)).substr(-2) + ':'
            + ('0' + number % 60).substr(-2);
        return hienthi;
    }
    reload(){
        this.getUser();
    }
    detailUser(id){
        this.routes.navigate(['/admin/resultquiz',id]);
    }
    select(id){
        let index = this.arrSelect.indexOf(id);
        console.log(index);
        if(index!=-1)
        this.arrSelect.splice(index,1);
        else this.arrSelect.push(id);
    }
    delete(){
        if(this.arrSelect.length==0)alert("Select user");
        else{
            this.intervieweeService.deleteInter(this.arrSelect).then(()=>{
                this.reload();
            }).catch(err=>{
                console.log(err);
            });
        }
    }
}
