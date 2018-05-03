import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate  } from '@angular/router';
import { QuizComponent } from './component/quiz/quiz.component';
import { ResultComponent } from './component/result/result.component';
import { ReviewComponent } from './component/review/review.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import{IQuizService} from './auth/isQuiz.service';
import {AdminComponent} from './admin/admin.component'
import {IResultService} from './auth/IResult.service'

const routes: Routes = [
  { path: 'quiz', component: QuizComponent,canActivate: [AuthGuard,IResultService] },
  { path: 'result', component: ResultComponent,canActivate: [AuthGuard,IQuizService] },
  { path: 'review', component: ReviewComponent,canActivate: [AuthGuard] },
  { path: 'login',component: LoginComponent},
  // { path: 'admin',component:AdminComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
]


@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
