import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment-taking',
  templateUrl: './assessment-taking.component.html',
  styleUrl: './assessment-taking.component.scss'
})
export class AssessmentTakingComponent implements OnInit {
  assessment: any;
  questions: any[] = [];
  currentQuestion: any;
  currentQuestionIndex: number = 0;
  totalQuestions: number = 0;
  studentAnswer: string = '';
  timeLeft: number = 0;
  timeSeconds: number = 0;
  isLastQuestion: boolean = false;
  timer: any;

  constructor(private route: ActivatedRoute, private studentService: StudentsService, private router: Router, private toast: NgToastService) { }


  ngOnInit(): void {
    const assessmentId = this.route.snapshot.paramMap.get('id');
    this.loadAssessment(assessmentId);

  }

  loadAssessment(id: any) {
    this.studentService.getAssessmentById(id).subscribe((data: any) => {
      this.assessment = data;
      this.totalQuestions = data.questions.length;
      this.timeLeft = Math.floor(data.time / 60);
      this.timeSeconds = data.time % 60;
      this.questions = [];
      data.questions.forEach((questionId: string) => {
        this.studentService.getQuestionById(questionId).subscribe((data: any) => {
          this.questions.push(data);
          if (this.questions.length === this.totalQuestions) {
            this.updateQuestion();
            this.startTimer();
          }
        },
        );
      });
    });
  }

  updateQuestion() {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.isLastQuestion = this.currentQuestionIndex === this.totalQuestions - 1;
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.updateQuestion();
    }
  }

  nextQuestion() {

    if (!this.isLastQuestion) {
      this.currentQuestionIndex++;
      this.updateQuestion();
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeSeconds > 0) {
        this.timeSeconds--;
      } else if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timeSeconds = 59;
      } else {
        clearInterval(this.timer);

      }
    }, 1000);
  }

  saveProgress() {
    Swal.fire('Success', 'Assessment Saved Successfully', 'success');
    this.router.navigate(['/feedback']);

  }
}


