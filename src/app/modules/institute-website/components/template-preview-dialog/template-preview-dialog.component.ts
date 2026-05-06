import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-template-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './template-preview-dialog.component.html',
  styleUrls: ['./template-preview-dialog.component.scss']
})
export class TemplatePreviewDialog {
  activeScreen = signal('home');

  mockCourses = [
    { name: 'IIT-JEE Advanced', desc: 'Comprehensive 2-year classroom program for Class 11-12.', duration: '2 Years', level: 'Advanced', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=300' },
    { name: 'NEET Medical', desc: 'Intensive medical entrance preparation for future doctors.', duration: '1 Year', level: 'Professional', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300' },
    { name: 'Foundation Program', desc: 'Building strong concepts for Class 9th & 10th students.', duration: '2 Years', level: 'Basic', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300' },
    { name: 'JEE Main Crash Course', desc: 'Fast-track revision and mock tests for JEE Main.', duration: '3 Months', level: 'Fast-track', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300' },
    { name: 'Olympiad Special', desc: 'Advanced problem solving for Math and Science Olympiads.', duration: '1 Year', level: 'Elite', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300' },
    { name: 'NTSE Batch', desc: 'Targeted preparation for National Talent Search Exam.', duration: '6 Months', level: 'Competitive', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=300' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TemplatePreviewDialog>
  ) {}

  setScreen(screen: string): void {
    this.activeScreen.set(screen);
  }

  selectTemplate(): void {
    this.dialogRef.close(true);
  }
}
