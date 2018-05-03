import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { 
    document.getElementById('admincss').setAttribute('href','./assets/css/paper-dashboard.css');
  }

  ngOnInit() {
  }

}
