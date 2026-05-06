import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'question-bank',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatInputModule, MatChipsModule],
  template: `
    <div class="module-container">
      <div class="module-header">
        <div>
          <h1>Question Bank</h1>
          <p>Create and organize your repository of MCQs and subjective questions.</p>
        </div>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Add Question
        </button>
      </div>

      <mat-card class="filter-card">
        <div class="search-bar">
          <mat-icon>search</mat-icon>
          <input type="text" placeholder="Search questions by text, tag or topic..." />
        </div>
        <div class="quick-tags">
          <mat-chip-listbox>
            <mat-chip-option selected>All Subjects</mat-chip-option>
            <mat-chip-option>Physics</mat-chip-option>
            <mat-chip-option>Chemistry</mat-chip-option>
            <mat-chip-option>Mathematics</mat-chip-option>
            <mat-chip-option>Biology</mat-chip-option>
          </mat-chip-listbox>
        </div>
      </mat-card>

      <mat-card class="questions-list-card">
        <table mat-table [dataSource]="questions" class="full-width-table">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let row">Q-{{row.id}}</td>
          </ng-container>

          <ng-container matColumnDef="text">
            <th mat-header-cell *matHeaderCellDef>Question Text</th>
            <td mat-cell *matCellDef="let row" class="question-text-cell">{{row.text}}</td>
          </ng-container>

          <ng-container matColumnDef="subject">
            <th mat-header-cell *matHeaderCellDef>Subject</th>
            <td mat-cell *matCellDef="let row">
              <span class="subject-tag">{{row.subject}}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="difficulty">
            <th mat-header-cell *matHeaderCellDef>Difficulty</th>
            <td mat-cell *matCellDef="let row">
              <span class="diff-level" [class]="row.difficulty.toLowerCase()">{{row.difficulty}}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let row">
              <button mat-icon-button color="primary"><mat-icon>edit</mat-icon></button>
              <button mat-icon-button color="warn"><mat-icon>delete</mat-icon></button>
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
    .module-header h1 { margin: 0; font-size: 2rem; font-weight: 800; }
    
    .filter-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
    .search-bar { 
      background: #f1f5f9; 
      padding: 0.75rem 1.25rem; 
      border-radius: 12px; 
      display: flex; 
      align-items: center; 
      gap: 1rem; 
    }
    .search-bar input { background: transparent; border: none; outline: none; flex: 1; font-size: 1rem; }
    .search-bar mat-icon { color: #64748b; }
    
    .full-width-table { width: 100%; }
    .question-text-cell { 
      max-width: 400px; 
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
      font-weight: 500;
    }
    
    .subject-tag { 
      background: #f1f5f9; 
      color: #133e87; 
      padding: 4px 10px; 
      border-radius: 6px; 
      font-size: 0.8rem; 
      font-weight: 600; 
    }
    
    .diff-level { font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
    .diff-level.easy { color: #059669; }
    .diff-level.medium { color: #d97706; }
    .diff-level.hard { color: #dc2626; }
    
    .questions-list-card { padding: 0; overflow: hidden; }
  `]
})
export class QuestionBankComponent {
  displayedColumns = ['id', 'text', 'subject', 'difficulty', 'actions'];
  questions = [
    { id: 1024, text: 'What is the speed of light in vacuum?', subject: 'Physics', difficulty: 'Easy' },
    { id: 1025, text: 'Find the derivative of sin(x^2)...', subject: 'Mathematics', difficulty: 'Medium' },
    { id: 1026, text: 'Define the process of Glycolysis in cells.', subject: 'Biology', difficulty: 'Hard' },
    { id: 1027, text: 'What is the atomic number of Gold?', subject: 'Chemistry', difficulty: 'Easy' },
  ];
}
