import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './component/quiz/quiz.component';
import { ResultComponent } from './component/result/result.component';
import { ReviewComponent } from './component/review/review.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'review', component: ReviewComponent },
  { path: '', redirectTo: '/quiz', pathMatch: 'full' }
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
