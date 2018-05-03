import { Component, OnInit } from '@angular/core';
import { fail } from 'assert';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'resultquiz', title: 'Result Quiz',  icon: 'ti-panel', class: '' },
    { path: 'interviewee', title: 'Interviewee Profile',  icon:'ti-user', class: '' },
    { path: 'question', title: 'Add Question',  icon:'ti-view-list-alt', class: '' },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  constructor() { 
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  ngOnInit() {
  }
  isNotMobileMenu(){
    // if($(window).width() > 991){
    //     return false;
    // }
    // return true;
    return false;
  }

}
