import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  timeSpent:number;
  result:number;
  getData() {
    this.result = JSON.parse(this.cookieService.get('result')).point;
    this.timeSpent = JSON.parse(this.cookieService.get('result')).timeSpent;

    //console.log(this.result);

    // this.traLois = JSON.parse(this.result[1]);

    // for (let i = 0; i < this.traLois.length; i++) {
    //   if (this.traLois[i].dung === true) {
    //     this.traLoiDung++;
    //   }
    // }

  }

  ngOnInit() {
    this.getData();
  }

}
