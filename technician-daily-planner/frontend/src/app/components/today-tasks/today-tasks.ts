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

  get totalTasks(): number {
    return this.tasks.length;
  }

  get completedTasks(): number {
    return this.tasks.filter(t => t.status === 'Completed').length;
  }

  get pendingTasks(): number {
    return this.tasks.filter(t => t.status !== 'Completed').length;
  }

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

  onComplete(task: Task, event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    // Prevent immediate checking if we want to confirm first (optional, but good UX)
    // For now, we'll let it check, and if cancelled, uncheck it.

    // Default to current time
    const now = new Date();
    const defaultTime = now.toISOString().slice(0, 16); // format for datetime-local if used, or just string

    const timeStr = prompt('Enter completion time (YYYY-MM-DD HH:MM) or leave empty for now:', defaultTime.replace('T', ' '));

    if (timeStr === null) {
      // User cancelled
      checkbox.checked = false;
      return;
    }

    const completedAt = timeStr ? new Date(timeStr) : new Date();

    if (isNaN(completedAt.getTime())) {
      this.toastService.show('Invalid date format', 'error');
      checkbox.checked = false;
      return;
    }

    this.taskService.completeTask(task._id!, { completedAt }).subscribe({
      next: (updatedTask) => {
        this.toastService.show('Task marked as completed', 'success');
        // Update local state
        const index = this.tasks.findIndex(t => t._id === updatedTask._id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;

          // Re-sort: Pending first, then Completed
          this.tasks.sort((a, b) => {
            if (a.status === b.status) return 0;
            return a.status === 'Pending' ? -1 : 1;
          });
        }
      },
      error: (error) => {
        checkbox.checked = false;
        this.toastService.show('Failed to complete task', 'error');
        console.error('Error completing task:', error);
      }
    });
  }
}
