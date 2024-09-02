import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private url = environment.baseUrl

  constructor(private http: HttpClient) { }
  
  getAssessments() {
    return this.http.get(`${this.url}/assessments`);
  }
  getAssessmentById(id: number) {
    return this.http.get(`${this.url}/assessments/${id}`);
  }

  getQuestionById(id: string) {
    return this.http.get(`${this.url}/questions/${id}`);
  }
}
