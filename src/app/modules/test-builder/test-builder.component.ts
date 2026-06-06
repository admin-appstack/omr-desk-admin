import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-test-builder',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './test-builder.component.html',
  styleUrls: ['./test-builder.component.scss']
})
export class TestBuilderComponent {
  testStats = [
    { label: 'Total Tests', value: '24', icon: 'fa-thin fa-file-lines', color: '#7c3aed' },
    { label: 'OMR Tests', value: '14', icon: 'fa-thin fa-qrcode', color: '#133e87' },
    { label: 'Online Tests', value: '10', icon: 'fa-thin fa-desktop', color: '#059669' },
    { label: 'Avg Duration', value: '90 min', icon: 'fa-thin fa-clock', color: '#d97706' },
  ];

  tests = [
    { name: 'Unit Test - Calculus', type: 'OMR', duration: 60, questions: 30, students: 120 },
    { name: 'Half Yearly Physics', type: 'Online', duration: 180, questions: 90, students: 95 },
    { name: 'Mock JEE Main #4', type: 'OMR', duration: 180, questions: 75, students: 240 },
    { name: 'Biology Quiz - Cells', type: 'Online', duration: 20, questions: 20, students: 60 },
    { name: 'NEET Practice #3', type: 'OMR', duration: 180, questions: 180, students: 310 },
  ];

  createTest() {}
}
