import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Task {
  _id?: string;
  customerName: string;
  location: string;
  taskType: 'Installation' | 'Repair' | 'Maintenance' | 'Inspection';
  scheduledTime: Date;
  notes?: string;
  status?: 'Pending' | 'Completed';
  completedAt?: Date;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  getTodayTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/today`);
  }

  completeTask(id: string, completionData: { completedAt: Date }): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/complete`, completionData);
  }
}
