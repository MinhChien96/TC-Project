import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  result: any;
  hienthi: string;
  traLoiDung: number = 0;
  traLois = new Array();

  getData() {
    this.result = JSON.parse(this.cookieService.get('result'));

    this.traLois = JSON.parse(this.result[1]);

    for (let i = 0; i < this.traLois.length; i++) {
      if (this.traLois[i].dung === true) {
        this.traLoiDung++;
      }
    }

  }

  ngOnInit() {
    this.getData();
  }

}
