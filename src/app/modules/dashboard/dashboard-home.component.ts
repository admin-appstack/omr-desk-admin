import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../auth/service/auth.service';

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

  summaryStats = [
    { label: 'Total Exams', value: '28', icon: 'fa-thin fa-file-lines', class: 'stat-orange', trend: '+3 this month' },
    { label: 'Total Students', value: '1,284', icon: 'fa-thin fa-users', class: 'stat-blue', trend: '+84 new' },
    { label: 'Avg. Score', value: '68%', icon: 'fa-thin fa-arrow-trend-up', class: 'stat-green', trend: '+4% vs last' },
    { label: 'Top Score', value: '98%', icon: 'fa-thin fa-trophy', class: 'stat-purple', trend: null },
  ];

  chartBars = [
    { label: 'UT-1', value: 65, color: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' },
    { label: 'Mid-T', value: 72, color: 'linear-gradient(180deg, #10b981 0%, #065f46 100%)' },
    { label: 'Mock-1', value: 58, color: 'linear-gradient(180deg, #f97316 0%, #c2410c 100%)' },
    { label: 'Mock-2', value: 80, color: 'linear-gradient(180deg, #a855f7 0%, #7c3aed 100%)' },
    { label: 'Final', value: 74, color: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' },
  ];

  topPerformers = [
    { name: 'Rahul Sharma', exam: 'NEET Practice #2', score: 98 },
    { name: 'Priya Nair', exam: 'Mid Term Maths', score: 95 },
    { name: 'Arjun Mehta', exam: 'Unit Test #1', score: 92 },
  ];

  results = [
    { examName: 'Unit Test #1 Physics', date: '2024-04-15', students: 120, avgScore: 68 },
    { examName: 'Mid Term Maths', date: '2024-04-20', students: 115, avgScore: 72 },
    { examName: 'NEET Practice #2', date: '2024-05-01', students: 240, avgScore: 54 },
    { examName: 'Final Exam Biology', date: '2024-05-10', students: 180, avgScore: 76 },
  ];
}
