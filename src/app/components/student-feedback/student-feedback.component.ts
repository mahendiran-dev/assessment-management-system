import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrl: './student-feedback.component.scss'
})
export class StudentFeedbackComponent {
  constructor(private toast: NgToastService, private router: Router) { }
  saveFeedBack() {
    this.toast.success('feedback saved successfully', 'Saved', 3000);
    this.router.navigate(['/student-view']);
    
  }
}
