import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentTakingComponent } from './components/assessment-taking/assessment-taking.component';
import { AssessmentCreationComponent } from './components/assessment-creation/assessment-creation.component';
import { QuestionBankComponent } from './components/question-bank/question-bank.component';
import { HomeComponent } from './components/home/home.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentFeedbackComponent } from './components/student-feedback/student-feedback.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'create-assessment', component: AssessmentCreationComponent },
  { path: 'question-bank', component: QuestionBankComponent },
  { path: 'take-assessment/:id', component: AssessmentTakingComponent },
  { path: 'student-view', component: StudentHomeComponent },
  { path: 'feedback', component: StudentFeedbackComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
