import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {
  quesBankForm: FormGroup;
  questions: any[] = [];
  editQues: any = null;
  searchText: string = '';

  constructor(private fb: FormBuilder, private apiService: TeacherService, private toast: NgToastService) {
    this.quesBankForm = this.fb.group({
      quesText: ['', Validators.required],
      options: this.fb.array([], Validators.required),
      correctAns: ['', Validators.required],
      tags: ['', Validators.required],
      category: ['', Validators.required],
      difficulty: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQues();
  }

  get options(): FormArray {
    return this.quesBankForm.get('options') as FormArray;
  }

  addOption(option: string = '') {
    this.options.push(this.fb.control(option, Validators.required));
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  loadQues() {
    this.apiService.getAllQues().subscribe((data: any) => {
      this.questions = data;
    });
  }

  saveQues() {
    if (this.quesBankForm.valid) {
      const newQuesValue = this.quesBankForm.value;
      if (this.editQues) {
        this.apiService.updateQues(this.editQues.id, newQuesValue).subscribe(() => {
          this.loadQues();
          this.toast.success("Question has been updated successfully", "Updated Successfully", 3000);
          this.quesBankForm.reset();
          this.editQues = null;
        }, (err: any) => {
          this.toast.danger(`${err.message || 'An error occurred'}`, "Error Updating Question", 4000);
        });
      } else {
        this.apiService.newQues(newQuesValue).subscribe((data: any) => {
          this.questions.push(data);
          this.quesBankForm.reset();
          this.toast.success("Question has been saved successfully", "Saved Successfully", 3000);
        }, (err: any) => {
          this.toast.danger(`${err.message || 'An error occurred'}`, "Error Saving Question", 4000);
        });
      }
    }
  }

  editQuestion(question: any) {
    this.editQues = question;
    this.quesBankForm.patchValue(question);
    this.options.clear();
    if (question.options) {
      question.options.forEach((opt: string) => this.addOption(opt));
    }
  }

  deleteQuestion(question: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.apiService.deleteQues(question.id).subscribe(() => {
        this.questions = this.questions.filter(x => x.id !== question.id);
        this.toast.success("Question has been deleted successfully", "Deleted Successfully", 3000);
      });
    }
  }
}