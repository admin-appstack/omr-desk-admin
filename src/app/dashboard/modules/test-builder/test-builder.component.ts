import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-test-builder',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTabsModule],
  templateUrl: './test-builder.component.html',
  styleUrls: ['./test-builder.component.scss']
})
export class TestBuilderComponent {
  tests = [
    { name: 'Unit Test - Calculus', type: 'OMR', duration: 60, questions: 30 },
    { name: 'Half Yearly Physics', type: 'Online', duration: 180, questions: 90 },
    { name: 'Mock JEE Main #4', type: 'OMR', duration: 180, questions: 75 },
    { name: 'Biology Quiz - Cells', type: 'Online', duration: 20, questions: 20 },
  ];
}
