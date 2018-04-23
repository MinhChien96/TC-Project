import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate  } from '@angular/router';
import { QuizComponent } from './component/quiz/quiz.component';
import { ResultComponent } from './component/result/result.component';
import { ReviewComponent } from './component/review/review.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import{IQuizService} from './auth/isQuiz.service';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent,canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent,canActivate: [AuthGuard,IQuizService] },
  { path: 'review', component: ReviewComponent,canActivate: [AuthGuard] },
  { path: 'login',component: LoginComponent},
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
