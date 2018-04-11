import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { ResultComponent } from './component/result/result.component';
import { ReviewComponent } from './component/review/review.component';
import { TimeClock } from './pipe/timeClock';
import { QuizService } from './service/quiz.service';
import {FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    ResultComponent,
    ReviewComponent,
    TimeClock
  ],
  imports: [
    BrowserModule,
    FormsModule,
    [RouterModule]
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
