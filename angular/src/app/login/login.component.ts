import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  passWord = "";
  userName = "";
  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit() {
  }

  // login(formSignIn){
  //     this.loginService.login(formSignIn.value.userName,formSignIn.value.passWord).then(result =>{
  //     if(result){
  //       this.router.navigate(["/quiz"]);
  //     }
  //     else {
  //       alert("Login fail");
  //     }
  //   }).catch(err=>console.log(err));
  //   this.passWord = "";
  //   this.userName = "";
  // }
  async login(formSignIn) {
    let  result = await this.loginService.login(formSignIn.value.userName, formSignIn.value.passWord);
    //console.log(result);
      if (result) {
        this.router.navigate(["/quiz"]);
      }
      else {
        alert("Login fail");
      }
    this.passWord = "";
    this.userName = "";
  }
}
