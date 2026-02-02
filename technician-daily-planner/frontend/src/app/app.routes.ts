import { Routes } from '@angular/router';
import { AddTask } from './components/add-task/add-task';
import { TodayTasks } from './components/today-tasks/today-tasks';

export const routes: Routes = [
    { path: 'add-task', component: AddTask },
    { path: 'today-tasks', component: TodayTasks },
    { path: '', redirectTo: '/today-tasks', pathMatch: 'full' },
];
