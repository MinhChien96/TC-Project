import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { IntervieweeService } from '../../service/interviewee.service'
import 'rxjs/add/operator/map';
import { DOCUMENT } from "@angular/platform-browser";


@Component({
  selector: 'app-interviewee',
  templateUrl: './interviewee.component.html',
  styleUrls: ['./interviewee.component.css']
})
export class IntervieweeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private intervieweeService: IntervieweeService) { }
  id: number;
  private sub: any;
  user = {};
  isEdit:boolean = false;
  urlPDF= "";
  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    //  if(this.id == 14)this.router.navigate(['admin/resultquiz']);
    await this.getUser();
    if(this.urlPDF)
    document.getElementById('pdfcv').setAttribute('src',this.urlPDF);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async getUser() {
    try {
      let result = await this.intervieweeService.getUerById(this.id);
      if (result.success) {
        if (result.data == null) throw new Error("Can not find user");
        this.user = result.data;
        if(result.data.cv)
        this.urlPDF = "http://localhost:3000/api/user/getcv/"+result.data.cv;
      }
      // this.intervieweeService.getCVByName("chien").subscribe(response=>{
      //   var file = new Blob([response], {type: 'application/pdf'});
      //   this.urlPDF = URL.createObjectURL(file);
      //   window.open(this.urlPDF);
      //   console.log(response);
      // })
      
    } catch (error) {
      alert("Cannot find user");
      this.router.navigate(['admin/resultquiz']);
      console.log(error);
    }
  }
  timeClock(number) {
    let hienthi = ('0' + Math.floor(number / 60)).substr(-2) + ':'
      + ('0' + number % 60).substr(-2);
    return hienthi;
  }
  back(){
    this.router.navigate(['/admin/resultquiz']);
  }

  async Save(){
    this.isEdit = !this.isEdit;
    // console.log(this.user);
    try {
      console.log(this.user);
      let result = await this.intervieweeService.updateInter(this.user);
      if(result.success){
        this.router.navigate(['/admin/resultquiz',result.data]);
      }
    } catch (error) {
      alert("Cannot update interviewee");
      console.log(error);
    }
  }
}
