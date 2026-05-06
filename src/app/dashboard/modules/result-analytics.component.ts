import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'result-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule],
  template: `
    <div class="module-container">
      <div class="module-header">
        <div>
          <h1>Result & Analytics</h1>
          <p>Analyze test performance, generate rank lists, and publish results.</p>
        </div>
        <button mat-raised-button color="accent">
          <mat-icon>publish</mat-icon>
          Publish Results
        </button>
      </div>

      <div class="analytics-overview">
        <mat-card class="chart-placeholder">
          <h3>Average Score Trend</h3>
          <div class="dummy-chart">
            <div class="bar" style="height: 40%"></div>
            <div class="bar" style="height: 60%"></div>
            <div class="bar" style="height: 55%"></div>
            <div class="bar" style="height: 80%"></div>
            <div class="bar" style="height: 70%"></div>
          </div>
        </mat-card>
      </div>

      <mat-card class="recent-results-card">
        <h3>Published Results</h3>
        <table mat-table [dataSource]="results" class="full-width-table">
          <ng-container matColumnDef="examName">
            <th mat-header-cell *matHeaderCellDef>Exam Name</th>
            <td mat-cell *matCellDef="let row">{{row.examName}}</td>
          </ng-container>

          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let row">{{row.date}}</td>
          </ng-container>

          <ng-container matColumnDef="students">
            <th mat-header-cell *matHeaderCellDef>Students</th>
            <td mat-cell *matCellDef="let row">{{row.students}}</td>
          </ng-container>

          <ng-container matColumnDef="avgScore">
            <th mat-header-cell *matHeaderCellDef>Avg. Score</th>
            <td mat-cell *matCellDef="let row">{{row.avgScore}}%</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let row">
              <button mat-button color="primary">View Rank List</button>
              <button mat-icon-button><mat-icon>download</mat-icon></button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card>
    </div>
  `,
  styles: [`
    .module-container { display: flex; flex-direction: column; gap: 2rem; }
    .module-header { display: flex; justify-content: space-between; align-items: center; }
    
    .chart-placeholder { padding: 1.5rem; background: white; }
    .dummy-chart { 
      height: 200px; 
      display: flex; 
      align-items: flex-end; 
      gap: 1.5rem; 
      padding: 1rem 2rem; 
      border-bottom: 2px solid #e2e8f0;
      margin-top: 1rem;
    }
    .bar { flex: 1; background: #133e87; border-radius: 4px 4px 0 0; opacity: 0.8; transition: opacity 0.2s; }
    .bar:hover { opacity: 1; }
    
    .full-width-table { width: 100%; }
    h3 { margin-bottom: 1.5rem; font-weight: 700; }
  `]
})
export class ResultAnalyticsComponent {
  displayedColumns = ['examName', 'date', 'students', 'avgScore', 'actions'];
  results = [
    { examName: 'Unit Test #1 Physics', date: '2024-04-15', students: 120, avgScore: 68 },
    { examName: 'Mid Term Maths', date: '2024-04-20', students: 115, avgScore: 72 },
    { examName: 'NEET Practice #2', date: '2024-05-01', students: 240, avgScore: 54 },
  ];
}
