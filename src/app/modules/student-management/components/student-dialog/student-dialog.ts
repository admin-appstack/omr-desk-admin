import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-student-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './student-dialog.html',
  styleUrl: './student-dialog.scss',
})
export class StudentDialog implements OnInit {
  className = '';
  rollNumber = '';
  studentName = '';
  studentEmail = '';
  whatsAppNumber = '';
  classes: string[] = [];
  tempClassName = '';

  constructor(
    public dialogRef: MatDialogRef<StudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    if (data) {
      this.tempClassName = data.className || '';
      this.rollNumber = data.rollNumber || '';
      this.studentName = data.name || '';
      this.studentEmail = data.email || '';
      this.whatsAppNumber = data.whatsAppNumber || '';
    }
  }

  ngOnInit(): void {
    this.fetchClasses();
  }

  fetchClasses(): void {
    this.http.get<any[]>('http://localhost:3000/api/classes').subscribe({
      next: (data) => {
        this.classes = data.map(c => c.className);
        if (this.tempClassName) {
          this.className = this.tempClassName;
          this.cdr.detectChanges();
        }
      },
      error: (error) => console.error('Error fetching classes:', error)
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      className: this.className,
      rollNumber: this.rollNumber,
      name: this.studentName,
      email: this.studentEmail,
      whatsAppNumber: this.whatsAppNumber
    });
  }
}
