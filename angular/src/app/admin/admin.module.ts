import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import { AdminComponent } from '../admin/admin.component';
import { SidebarComponent } from '../admin/sidebar/sidebar.component';
import { NavbarComponent } from '../admin/navbar/navbar.component';
import { QuizComponent} from './quiz/quiz.component';
import { IntervieweeComponent } from './interviewee/interviewee.component';
import { QuestionComponent } from './question/question.component';
import {KeysPipe} from '../pipe/keyArray';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddIntervieweeComponent } from './add-interviewee/add-interviewee.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PdfViewerModule
    ],
    declarations: [
        AdminComponent,
        SidebarComponent,
        NavbarComponent,
        QuizComponent,
        IntervieweeComponent,
        QuestionComponent,
        KeysPipe,
        AddIntervieweeComponent,
    ]
})
export class AdminModule {}