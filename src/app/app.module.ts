import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuestionBankComponent } from './components/question-bank/question-bank.component';
import { AssessmentCreationComponent } from './components/assessment-creation/assessment-creation.component';
import { AssessmentDashboardComponent } from './components/assessment-dashboard/assessment-dashboard.component';
import { AssessmentTakingComponent } from './components/assessment-taking/assessment-taking.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NgToastModule } from 'ng-angular-popup';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { StudentFeedbackComponent } from './components/student-feedback/student-feedback.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionBankComponent,
    AssessmentCreationComponent,
    AssessmentDashboardComponent,
    AssessmentTakingComponent,
    FilterPipe,
    HeaderComponent,
    HomeComponent,
    StudentFeedbackComponent,
    StudentHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
