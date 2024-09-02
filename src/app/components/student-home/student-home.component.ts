import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.scss'
})
export class StudentHomeComponent implements OnInit {
  assessments: any[] = [];

 constructor(private studentService: StudentsService, private router: Router) {}

 ngOnInit() {
   this.loadAssessments();
 }

 loadAssessments(){
   this.studentService.getAssessments().subscribe((data:any) => {
     this.assessments = data;
   });
 }

 takeAssessment(assessmentId: any) {
   this.router.navigate(['/take-assessment', assessmentId]);
 }
}