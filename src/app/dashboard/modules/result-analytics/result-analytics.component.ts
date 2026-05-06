import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-result-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './result-analytics.component.html',
  styleUrls: ['./result-analytics.component.scss']
})
export class ResultAnalyticsComponent {
  displayedColumns = ['examName', 'date', 'students', 'avgScore', 'actions'];
  results = [
    { examName: 'Unit Test #1 Physics', date: '2024-04-15', students: 120, avgScore: 68 },
    { examName: 'Mid Term Maths', date: '2024-04-20', students: 115, avgScore: 72 },
    { examName: 'NEET Practice #2', date: '2024-05-01', students: 240, avgScore: 54 },
  ];
}
