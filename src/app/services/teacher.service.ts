import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private url = environment.baseUrl
  constructor(private http: HttpClient) { }

  getAllQues() {
    return this.http.get(`${this.url}/questions`)
  }
  getQuesById(id: number) {
    return this.http.get(`${this.url}/questions/${id}`)
  }
  newQues(newQuesValue: any) {
    return this.http.post(`${this.url}/questions`, newQuesValue)
  }
  updateQues(id: number, newQuesValue: any) {
    return this.http.put(`${this.url}/questions/${id}`, newQuesValue)
  }
  deleteQues(id: number) {
    return this.http.delete(`${this.url}/questions/${id}`)
  }
  // Assessment Service
  getAllAssessment() {
    return this.http.get(`${this.url}/assessments`)
  }
  getAssessmentById(id: number) {
    return this.http.get(`${this.url}/assessments/${id}`)
  }
  newAssessment(assessmentValue: any) {
    return this.http.post(`${this.url}/assessments`, assessmentValue)
  }
  updateAssessment(id: number, assessmentValue: any) {
    return this.http.put(`${this.url}/assessments/${id}`, assessmentValue)
  }
  deleteAssessment(id: number) {
    return this.http.delete(`${this.url}/assessments/${id}`)
  }
}
