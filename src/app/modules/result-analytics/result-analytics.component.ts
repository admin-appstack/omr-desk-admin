import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-result-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule],
  templateUrl: './result-analytics.component.html',
  styleUrls: ['./result-analytics.component.scss']
})
export class ResultAnalyticsComponent {
  displayedColumns = ['examName', 'date', 'students', 'avgScore', 'actions'];

  summaryStats = [
    { label: 'Total Exams',    value: '28',    icon: 'fa-thin fa-file-lines',   color: '#c2410c', bg: '#fff7ed', trend: '+3 this month' },
    { label: 'Total Students', value: '1,284', icon: 'fa-thin fa-users',       color: '#1d4ed8', bg: '#eff6ff', trend: '+84 new'       },
    { label: 'Avg. Score',     value: '68%',   icon: 'fa-thin fa-arrow-trend-up',  color: '#059669', bg: '#f0fdf4', trend: '+4% vs last'  },
    { label: 'Top Score',      value: '98%',   icon: 'fa-thin fa-trophy', color: '#d97706', bg: '#fefce8', trend: null           },
  ];

  chartBars = [
    { label: 'UT-1',   value: 65, color: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' },
    { label: 'Mid-T',  value: 72, color: 'linear-gradient(180deg, #10b981 0%, #065f46 100%)' },
    { label: 'Mock-1', value: 58, color: 'linear-gradient(180deg, #f97316 0%, #c2410c 100%)' },
    { label: 'Mock-2', value: 80, color: 'linear-gradient(180deg, #a855f7 0%, #7c3aed 100%)' },
    { label: 'Final',  value: 74, color: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' },
  ];

  topPerformers = [
    { name: 'Rahul Sharma',  exam: 'NEET Practice #2', score: 98 },
    { name: 'Priya Nair',    exam: 'Mid Term Maths',    score: 95 },
    { name: 'Arjun Mehta',   exam: 'Unit Test #1',      score: 92 },
  ];

  results = [
    { examName: 'Unit Test #1 Physics', date: '2024-04-15', students: 120, avgScore: 68 },
    { examName: 'Mid Term Maths',       date: '2024-04-20', students: 115, avgScore: 72 },
    { examName: 'NEET Practice #2',     date: '2024-05-01', students: 240, avgScore: 54 },
    { examName: 'Final Exam Biology',   date: '2024-05-10', students: 180, avgScore: 76 },
  ];
}
