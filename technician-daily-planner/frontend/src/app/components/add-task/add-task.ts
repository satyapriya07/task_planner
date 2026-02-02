import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  taskForm: FormGroup;
  isSubmitting = false;

  taskTypes = ['Installation', 'Repair', 'Maintenance', 'Inspection'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.taskForm = this.fb.group({
      customerName: ['', Validators.required],
      location: ['', Validators.required],
      taskType: ['Installation', Validators.required],
      scheduledTime: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastService.show('Task added successfully!', 'success');
        this.taskForm.reset({
          taskType: 'Installation',
          notes: ''
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        this.toastService.show(error.error?.message || 'Failed to create task', 'error');
        console.error('Error creating task:', error);
      }
    });
  }
}
