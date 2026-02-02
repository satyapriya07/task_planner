import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskService, Task } from '../../services/task';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-today-tasks',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './today-tasks.html',
  styleUrl: './today-tasks.css'
})
export class TodayTasks implements OnInit {
  tasks: Task[] = [];
  isLoading = true;

  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.isLoading = true;
    this.taskService.getTodayTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.show('Failed to load tasks', 'error');
        console.error('Error fetching tasks:', error);
      }
    });
  }
}
