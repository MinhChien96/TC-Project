import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {QuizComponent} from '../admin/quiz/quiz.component';
import {QuestionComponent} from './question/question.component';
import {IntervieweeComponent} from './interviewee/interviewee.component';
import {AddIntervieweeComponent} from './add-interviewee/add-interviewee.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import{IsAdminService} from '../auth/isAdmin.service';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [IsAdminService],
        children: [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            { path: 'resultquiz', component :QuizComponent},
            { path: 'interviewee', component :AddIntervieweeComponent},
            { path: 'resultquiz/:id', component :IntervieweeComponent},
            { path: 'question', component :QuestionComponent},
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule  {}
