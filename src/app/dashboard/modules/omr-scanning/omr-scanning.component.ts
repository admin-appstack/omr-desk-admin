import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-omr-scanning',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatProgressBarModule],
  templateUrl: './omr-scanning.component.html',
  styleUrls: ['./omr-scanning.component.scss']
})
export class OmrScanningComponent {
  displayedColumns = ['batchId', 'testName', 'count', 'status'];
  history = [
    { batchId: 'BATCH-001', testName: 'JEE Mains Practice', count: 120, status: 'Completed' },
    { batchId: 'BATCH-002', testName: 'Monthly NEET Test', count: 85, status: 'Completed' },
    { batchId: 'BATCH-003', testName: 'Scholarship Exam', count: 340, status: 'Processing' },
  ];
}
