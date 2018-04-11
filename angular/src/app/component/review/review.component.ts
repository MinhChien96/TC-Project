import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  result: any;
  traLois: any;
  traLoiDung:number = 0;

  getData(){
    this.result = JSON.parse(this.cookieService.get('result'));

    this.traLois = JSON.parse(this.result[1]);

    for (let i = 0; i < this.traLois.length; i++) {
      if (this.traLois[i].dung === true) {
        this.traLoiDung++;
      }
    }
    console.warn(this.traLoiDung);
  }

  ngOnInit() {
    this.getData();
  }

}
