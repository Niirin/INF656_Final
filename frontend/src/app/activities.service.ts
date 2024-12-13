import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activities } from './activities.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private baseUrl: string = 'http://localhost:3000/api/activities';
  http = inject(HttpClient);

  
  getAllActivities(): Observable<Activities[]> {
    return this.http.get<Activities[]>(`${this.baseUrl}`);
  }

  getActivityById(id: string): Observable<Activities> {
    return this.http.get<Activities>(`${this.baseUrl}/${id}`);
  }

  addActivity(activity: Activities): Observable<Activities> {
    console.log(activity);
    return this.http.post<Activities>(`${this.baseUrl}/create`, activity);
  }

  updateActivity(id: string, activity: Activities): Observable<Activities> {
    return this.http.put<Activities>(`${this.baseUrl}/update/${id}`, activity);
  }

  deleteActivity(id: string): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.baseUrl}/delete/${id}`);
  }
}
