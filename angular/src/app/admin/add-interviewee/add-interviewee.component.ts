import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {IntervieweeService} from '../../service/interviewee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-interviewee',
  templateUrl: './add-interviewee.component.html',
  styleUrls: ['./add-interviewee.component.css']
})
export class AddIntervieweeComponent implements OnInit {
  filesToUpload: Array<File> = [];
  constructor(private http: Http,private intervieweeService:IntervieweeService,private routes:Router) {}
  user = {name:"",cv:""};
  ngOnInit() {
  }
  pathPDF: string;
  async upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    // formData.append("uploads[]", files[0], files[0]['name']);
    // let resUpload = await this.intervieweeService.upLoadCv(formData);
    // if(resUpload.success)console.log("Minh Chien");
    // console.log(this.user);

    try {
      var d = new Date();
      var n = d.getDate().toString()+d.getMonth()+d.getFullYear();
      var temp = this.user.name.replace(/ /g,"");
      temp = this.change_alias(temp);
      this.user.cv =temp +"_"+n+".pdf";
      let resCreate = await this.intervieweeService.createInter(this.user);
      if(!resCreate.success) throw new Error("Can not insert interviewee");
      formData.append("uploads[]", files[0],this.user.cv);
      let resUpload = await this.intervieweeService.upLoadCv(formData);
      if(!resUpload.success) throw new Error("Can not upload CV");
      this.routes.navigate(['/admin/resultquiz',resCreate.data]);
    } catch (error) {
      console.log(error+"");
      alert("Can not insert interviewee");
    }
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

    //ng viewer pdf
    let $img: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pathPDF = e.target.result;
      };
      reader.readAsArrayBuffer($img.files[0]);
    }
  }

  //convert vie to eng
  change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}
}
