import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { StudentDialog } from './components/student-dialog/student-dialog';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule, MatDialogModule, MatMenuModule, MatDividerModule],
  templateUrl: './student-management.html',
  styleUrl: './student-management.scss',
})
export class StudentManagement implements OnInit {
  displayedColumns = ['id', 'student', 'batch', 'whatsAppNumber', 'actions'];

  statCards = [
    { label: 'Total Students',   value: '0', icon: 'fa-thin fa-graduation-cap',           theme: 'total',   tag: '+0 this month', tagClass: 'up' },
    { label: 'Active Students',  value: '0', icon: 'fa-thin fa-circle-check',     theme: 'active',  tag: 'Currently enrolled', tagClass: 'info' },
    { label: 'Pending Profiles', value: '0',   icon: 'fa-thin fa-pending-actions',  theme: 'pending', tag: 'Awaiting docs', tagClass: 'warn' },
    { label: 'Alumni',           value: '0',   icon: 'fa-thin fa-trophy',     theme: 'alumni',  tag: 'Graduated', tagClass: 'admin' },
  ];

  students = signal<any[]>([]);
  dataSource = new MatTableDataSource<any>([]);
  currentFilter = 'All';
  searchQuery = '';

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get<any[]>('http://localhost:3000/student-management').subscribe({
      next: (data) => {
        const mappedData = data.map(student => ({
          id: student.rollNumber || student.id.toString(),
          name: student.name,
          email: student.email,
          avatar: student.name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
          batch: student.batch,
          whatsAppNumber: student.whatsAppNumber || '',
          status: student.status,
          realId: student.id,
          className: student.batch,
          rollNumber: student.rollNumber
        }));
        
        this.students.set(mappedData);
        this.updateDataSource();
        this.updateStats(data);
      },
      error: (error) => console.error('Error fetching students:', error)
    });
  }

  updateStats(data: any[]) {
    const total = data.length;
    const active = data.filter(s => s.status === 'Active').length;
    const pending = data.filter(s => s.status === 'Pending').length;
    const suspended = data.filter(s => s.status === 'Suspended').length;

    this.statCards[0].value = total.toString();
    this.statCards[1].value = active.toString();
    this.statCards[2].value = pending.toString();
    this.statCards[3].value = suspended.toString();
  }

  openStudentDialog(student?: any) {
    const dialogRef = this.dialog.open(StudentDialog, {
      width: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        const payload = {
          rollNumber: result.rollNumber,
          name: result.name,
          email: result.email,
          batch: result.className,
          whatsAppNumber: result.whatsAppNumber,
          enrollmentDate: new Date().toISOString().split('T')[0]
        };

        if (student && student.realId) {
          this.http.put(`http://localhost:3000/student-management/${student.realId}`, payload).subscribe({
            next: () => {
              console.log('Student updated successfully');
              this.fetchStudents();
            },
            error: (error) => console.error('Error updating student:', error)
          });
        } else {
          this.http.post('http://localhost:3000/student-management', { ...payload, studentId: 'STU-' + Date.now() }).subscribe({
            next: () => {
              console.log('Student created successfully');
              this.fetchStudents();
            },
            error: (error) => console.error('Error creating student:', error)
          });
        }
      }
    });
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = filterValue;
    this.updateDataSource();
  }

  applyFilter(status: string) {
    this.currentFilter = status;
    this.updateDataSource();
  }

  updateDataSource() {
    let filtered = this.students();
    if (this.currentFilter !== 'All') {
      filtered = filtered.filter(student => student.status === this.currentFilter);
    }
    if (this.searchQuery) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(this.searchQuery) ||
        student.email.toLowerCase().includes(this.searchQuery) ||
        student.batch.toLowerCase().includes(this.searchQuery)
      );
    }
    this.dataSource.data = filtered;
  }

  updateStatus(student: any, status: string) {
    if (student.realId) {
      this.http.patch(`http://localhost:3000/student-management/${student.realId}/status`, { status }).subscribe({
        next: () => {
          console.log('Status updated successfully');
          this.fetchStudents();
        },
        error: (error) => console.error('Error updating status:', error)
      });
    }
  }

  deleteStudent(student: any) {
    if (student.realId && confirm(`Are you sure you want to delete student "${student.name}"?`)) {
      this.http.delete(`http://localhost:3000/student-management/${student.realId}`).subscribe({
        next: () => {
          console.log('Student deleted successfully');
          this.fetchStudents();
        },
        error: (error) => console.error('Error deleting student:', error)
      });
    }
  }
}
