import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { ResultComponent } from './component/result/result.component';
import { ReviewComponent } from './component/review/review.component';
import { TimeClock } from './pipe/timeClock';
import { QuizService } from './service/quiz.service';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import { LoginService} from './service/login.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';
import {IQuizService} from './auth/isQuiz.service';
import{ IResultService} from './auth/IResult.service'
import {AdminModule} from './admin/admin.module';
import {IntervieweeService} from './service/interviewee.service';
import {QuestionService} from './service/question.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    ResultComponent,
    ReviewComponent,
    TimeClock,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [QuizService, CookieService, LoginService, AuthService,
    AuthGuardService, IQuizService, IResultService, QuestionService,
    IntervieweeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
