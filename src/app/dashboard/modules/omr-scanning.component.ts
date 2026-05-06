import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'omr-scanning',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatProgressBarModule],
  template: `
    <div class="module-container">
      <div class="module-header">
        <div>
          <h1>OMR Scanning</h1>
          <p>Process your OMR sheets using AI-powered scanning technology.</p>
        </div>
        <button mat-raised-button color="primary">
          <mat-icon>cloud_upload</mat-icon>
          Upload New Batch
        </button>
      </div>

      <div class="scanning-grid">
        <mat-card class="upload-zone">
          <div class="drop-area">
            <mat-icon>camera_alt</mat-icon>
            <h3>Drag & Drop OMR Sheets</h3>
            <p>or click to select files (JPG, PNG, PDF)</p>
            <button mat-stroked-button>Select Files</button>
          </div>
        </mat-card>

        <mat-card class="active-scans">
          <h3>Active Processing</h3>
          <div class="process-item">
            <div class="process-info">
              <span>Batch_2024_05_06.zip</span>
              <span>75%</span>
            </div>
            <mat-progress-bar mode="determinate" value="75"></mat-progress-bar>
          </div>
        </mat-card>
      </div>

      <mat-card class="history-card">
        <h3>Recent Scan History</h3>
        <table mat-table [dataSource]="history" class="full-width-table">
          <ng-container matColumnDef="batchId">
            <th mat-header-cell *matHeaderCellDef>Batch ID</th>
            <td mat-cell *matCellDef="let row">{{row.batchId}}</td>
          </ng-container>

          <ng-container matColumnDef="testName">
            <th mat-header-cell *matHeaderCellDef>Test Name</th>
            <td mat-cell *matCellDef="let row">{{row.testName}}</td>
          </ng-container>

          <ng-container matColumnDef="count">
            <th mat-header-cell *matHeaderCellDef>Sheets</th>
            <td mat-cell *matCellDef="let row">{{row.count}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let row">
              <span class="status-badge" [class]="row.status.toLowerCase()">{{row.status}}</span>
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
    .module-header p { margin: 0.5rem 0 0; color: #64748b; }
    
    .scanning-grid { display: grid; grid-template-cols: 2fr 1fr; gap: 2rem; }
    
    .upload-zone { 
      padding: 3rem; 
      border: 2px dashed #e2e8f0; 
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    .drop-area { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .drop-area mat-icon { font-size: 64px; width: 64px; height: 64px; color: #133e87; opacity: 0.5; }
    .drop-area h3 { margin: 0; font-weight: 700; }
    .drop-area p { margin: 0; color: #64748b; }
    
    .active-scans { padding: 1.5rem; }
    .process-item { margin-top: 1.5rem; }
    .process-info { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 600; }
    
    .full-width-table { width: 100%; }
    .status-badge { 
      padding: 4px 12px; 
      border-radius: 999px; 
      font-size: 0.75rem; 
      font-weight: 700; 
      text-transform: uppercase; 
    }
    .status-badge.completed { background: #dcfce7; color: #15803d; }
    .status-badge.processing { background: #dbeafe; color: #1e40af; }
    
    h3 { margin-bottom: 1.5rem; font-weight: 700; }
  `]
})
export class OmrScanningComponent {
  displayedColumns = ['batchId', 'testName', 'count', 'status'];
  history = [
    { batchId: 'BATCH-001', testName: 'JEE Mains Practice', count: 120, status: 'Completed' },
    { batchId: 'BATCH-002', testName: 'Monthly NEET Test', count: 85, status: 'Completed' },
    { batchId: 'BATCH-003', testName: 'Scholarship Exam', count: 340, status: 'Processing' },
  ];
}
