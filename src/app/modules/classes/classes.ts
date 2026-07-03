import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ConfirmationModalComponent } from '../../common/modals/confirmation-modal/confirmation-modal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationModalComponent
  ],
  templateUrl: './classes.html',
  styleUrl: './classes.scss',
})
export class ClassesComponent implements OnInit {
  isCreatingClass = false;
  isEditing = false;
  selectedClass: any = null;
  classesList = signal<any[]>([]); 
  classForm: FormGroup;
  displayedColumns: string[] = ['id', 'className', 'section', 'stream', 'actions'];

  showDeleteModal = signal(false);
  classToDelete = signal<any>(null);

  streams = ['Science', 'Commerce', 'Arts', 'General'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.classForm = this.fb.group({
      className: ['', Validators.required],
      section: ['', Validators.required],
      stream: ['General'],
      description: ['']
    });
  }

  ngOnInit() {
    this.fetchClasses();
    
    this.route.queryParams.subscribe(params => {
      if (params['action'] === 'create') {
        this.startCreateClass();
      }
    });
  }

  fetchClasses() {
    this.http.get<any[]>('http://localhost:3000/api/classes').subscribe({
      next: (data) => {
        this.classesList.set(data);
      },
      error: (error) => {
        console.error('Error fetching classes:', error);
      }
    });
  }

  startCreateClass() {
    this.isCreatingClass = true;
  }

  cancelCreate() {
    this.isCreatingClass = false;
    this.isEditing = false;
    this.selectedClass = null;
    this.classForm.reset({ stream: 'General' });
  }

  editClass(classData: any) {
    this.isEditing = true;
    this.isCreatingClass = true;
    this.selectedClass = classData;
    
    this.classForm.patchValue({
      className: classData.className,
      section: classData.section,
      stream: classData.stream,
      description: classData.description
    });
  }

  deleteClass(classData: any) {
    this.classToDelete.set(classData);
    this.showDeleteModal.set(true);
  }

  onConfirmDelete() {
    const classData = this.classToDelete();
    if (classData) {
      this.http.delete(`http://localhost:3000/api/classes/${classData.id}`).subscribe({
        next: () => {
          console.log('Class deleted successfully');
          this.showDeleteModal.set(false);
          this.classToDelete.set(null);
          this.fetchClasses(); // Refresh list
        },
        error: (error) => {
          console.error('Error deleting class:', error);
        }
      });
    }
  }

  onCancelDelete() {
    this.showDeleteModal.set(false);
    this.classToDelete.set(null);
  }

  saveClass() {
    if (this.classForm.valid) {
      const data = this.classForm.value;
      
      const request = this.isEditing && this.selectedClass
        ? this.http.put(`http://localhost:3000/api/classes/${this.selectedClass.id}`, data)
        : this.http.post('http://localhost:3000/api/classes', data);

      request.subscribe({
        next: (response) => {
          console.log('Class saved successfully:', response);
          this.isCreatingClass = false;
          this.isEditing = false;
          this.selectedClass = null;
          this.classForm.reset({ stream: 'General' });
          this.fetchClasses();
          
          // Check if we need to return to exams
          const pendingExamState = localStorage.getItem('pendingExamState');
          if (pendingExamState) {
            this.router.navigate(['/dashboard/exams']);
          } else {
            // Clear query params and return to listing
            this.router.navigate(['/dashboard/classes']);
          }
        },
        error: (error) => {
          console.error('Error saving class:', error);
        }
      });
    }
  }
}
