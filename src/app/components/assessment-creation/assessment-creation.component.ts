import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-assessment-creation',
  templateUrl: './assessment-creation.component.html',
  styleUrls: ['./assessment-creation.component.scss']
})
export class AssessmentCreationComponent implements OnInit {
  assessmentForm: FormGroup;
  assessments: any[] = [];
  questions: any[] = [];
  editingAssessment: any = null;
  searchText: string = '';
  constructor(private fb: FormBuilder, private apiService: TeacherService, private toast: NgToastService) {
    this.assessmentForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      instructions: ['', Validators.required],
      time: ['',Validators.required],
      questions: [[], Validators.required],
      
    });
  }

  ngOnInit(): void {
    this.loadAssessments();
    this.loadQuestions();
  }

  loadAssessments() {
    this.apiService.getAllAssessment().subscribe((data: any) => {
      this.assessments = data;
    });
  }

  loadQuestions() {
    this.apiService.getAllQues().subscribe((data: any) => {
      this.questions = data;
    });
  }

  saveAssessment() {
    if (this.assessmentForm.valid) {
      const assessmentValue = this.assessmentForm.value;
      if (this.editingAssessment) {
        this.apiService.updateAssessment(this.editingAssessment.id, assessmentValue).subscribe(() => {
          this.loadAssessments();
          this.assessmentForm.reset();
          this.toast.success('Assessment has been updated successfully', 'Updated Successfully', 3000);
          this.editingAssessment = null;
        }, (err: any) => {
          this.toast.danger(err.message || 'An error occurred', 'Error Updating Assessment', 4000);
        });
      } else {
        this.apiService.newAssessment(assessmentValue).subscribe((data: any) => {
          this.assessments.push(data);
          this.assessmentForm.reset();
          this.toast.success('Assessment has been saved successfully', 'Saved Successfully', 3000);
        }, (err: any) => {
          this.toast.danger(err.message || 'An error occurred', 'Error Saving Assessment', 4000);
        });
      }
    }
  }

  editAssessment(assessment: any) {
    this.editingAssessment = assessment;
    this.assessmentForm.patchValue({
      ...assessment,
      questions: assessment.questions.map((q: any) => q.id)  // Set selected question IDs
    });
  }

  deleteAssessment(assessment: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.apiService.deleteAssessment(assessment.id).subscribe(() => {
        this.assessments = this.assessments.filter(x => x.id !== assessment.id);
        this.toast.success('Assessment has been deleted successfully', 'Deleted Successfully', 3000);
      });
    }
  }
}
