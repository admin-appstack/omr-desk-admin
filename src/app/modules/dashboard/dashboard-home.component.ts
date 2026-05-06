import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {

  constructor(private readonly authService: AuthService) {}

  get user() {
    return this.authService.currentUser;
  }

  activeBatches = [
    { name: 'Batch_2024_05_06.zip', progress: 75, color: 'primary' },
    { name: 'NEET_Mock_Test_3.pdf', progress: 40, color: 'accent' },
  ];

  recentActivity = [
    { text: 'Results published for Unit Test #1', time: '2 mins ago', color: '#133e87' },
    { text: 'New batch uploaded — Scholarship Exam', time: '18 mins ago', color: '#e85b24' },
    { text: 'Question Bank updated: 12 new Qs', time: '1 hour ago', color: '#059669' },
    { text: 'Institute Website updated', time: '3 hours ago', color: '#7c3aed' },
    { text: 'OMR scan completed: 340 sheets', time: 'Yesterday', color: '#0ea5e9' },
  ];
}
