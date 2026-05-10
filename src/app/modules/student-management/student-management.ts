import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule],
  templateUrl: './student-management.html',
  styleUrl: './student-management.scss',
})
export class StudentManagement {
  displayedColumns = ['id', 'student', 'batch', 'enrollmentDate', 'status', 'actions'];

  statCards = [
    { label: 'Total Students',   value: '4,521', icon: 'school',           theme: 'total',   tag: '+45 this month', tagClass: 'up' },
    { label: 'Active Students',  value: '4,105', icon: 'check_circle',     theme: 'active',  tag: 'Currently enrolled', tagClass: 'info' },
    { label: 'Pending Profiles', value: '182',   icon: 'pending_actions',  theme: 'pending', tag: 'Awaiting docs', tagClass: 'warn' },
    { label: 'Alumni',           value: '234',   icon: 'emoji_events',     theme: 'alumni',  tag: 'Graduated', tagClass: 'admin' },
  ];

  students = [
    { id: 'STU-24001', name: 'John Doe', email: 'john.d@example.com', avatar: 'JD', batch: 'Batch A - 2024', enrollmentDate: '2024-01-15', status: 'Active' },
    { id: 'STU-24002', name: 'Sarah Connor', email: 'sarah.c@example.com', avatar: 'SC', batch: 'Batch B - 2024', enrollmentDate: '2024-01-18', status: 'Active' },
    { id: 'STU-24003', name: 'Michael Smith', email: 'mike.s@example.com', avatar: 'MS', batch: 'Batch A - 2024', enrollmentDate: '2024-02-05', status: 'Pending' },
    { id: 'STU-24004', name: 'Emma Watson', email: 'emma.w@example.com', avatar: 'EW', batch: 'Batch C - 2024', enrollmentDate: '2024-02-12', status: 'Active' },
    { id: 'STU-24005', name: 'James Brown', email: 'james.b@example.com', avatar: 'JB', batch: 'Batch A - 2023', enrollmentDate: '2023-08-20', status: 'Suspended' },
  ];
}
