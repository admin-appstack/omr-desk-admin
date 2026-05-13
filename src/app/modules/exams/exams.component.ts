import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../common/modals/confirmation-modal/confirmation-modal';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ConfirmationModalComponent,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatTabsModule
  ],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  isCreatingExam = signal(false);
  isEditing = signal(false);
  isViewingDetails = signal(false);
  selectedExam: any = null;

  showDeleteModal = signal(false);
  examToDelete = signal<any>(null);

  basicDetailsForm!: FormGroup;
  subjectDetailsForm!: FormGroup;
  sectionDetailsForm!: FormGroup;

  classes = ['Class 10', 'Class 11', 'Class 12'];
  questionTypes = [
    'TrueOrFalse',
    '3 option',
    '4 option',
    '5 option',
    '6 option',
    '8 option',
    '10 option',
    'Matrix',
    'Numerical',
    'Subjective'
  ];
  marksOptions = [1, 2, 3, 4, 5];

  exams = signal<any[]>([]);
  displayedColumns: string[] = ['id', 'name', 'className', 'date', 'mode', 'status', 'actions'];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.initForms();
    this.fetchExams();
    this.fetchClasses();
    
    // Check for preserved state!
    const savedState = localStorage.getItem('pendingExamState');
    if (savedState) {
      console.log('Restoring pending exam state...');
      const state = JSON.parse(savedState);
      this.isCreatingExam.set(true); // Open form
      
      // Patch values!
      this.basicDetailsForm.patchValue(state.basic);
      
      // For arrays, we need to reconstruct the controls!
      if (state.subject && state.subject.subjects) {
        const subjectsArray = this.fb.array(state.subject.subjects.map((s: any) => this.fb.group(s)));
        this.subjectDetailsForm.setControl('subjects', subjectsArray);
      }
      
      // Patch other non-array values in subject form!
      this.subjectDetailsForm.patchValue({
        rollNoDigits: state.subject.rollNoDigits,
        examSets: state.subject.examSets,
        subjectsCount: state.subject.subjectsCount
      });

      if (state.section && state.section.subjectSections) {
        const sectionsArray = this.fb.array(state.section.subjectSections.map((s: any) => this.fb.group(s)));
        this.sectionDetailsForm.setControl('subjectSections', sectionsArray);
      }
      
      // Clear storage!
      localStorage.removeItem('pendingExamState');
    }
  }

  fetchExams() {
    console.log('Fetching exams from http://localhost:3000/exams...');
    this.http.get<any[]>('http://localhost:3000/exams').subscribe({
      next: (data) => {
        console.log('Fetched exams data:', data);
        this.exams.set(data);
      },
      error: (error) => {
        console.error('Error fetching exams:', error);
      }
    });
  }

  fetchClasses() {
    this.http.get<any[]>('http://localhost:3000/classes').subscribe({
      next: (data) => {
        this.classes = data.map(c => c.className);
      },
      error: (error) => {
        console.error('Error fetching classes:', error);
      }
    });
  }

  initForms() {
    this.basicDetailsForm = this.fb.group({
      className: ['', Validators.required],
      examName: ['', Validators.required],
      examDate: [new Date(), Validators.required],
      examMode: ['Offline', Validators.required]
    });

    this.subjectDetailsForm = this.fb.group({
      rollNoDigits: [5, [Validators.required, Validators.min(1)]],
      examSets: [1, [Validators.required, Validators.min(1)]],
      subjectsCount: [1, [Validators.required, Validators.min(1)]],
      subjects: this.fb.array([this.createSubject()])
    });

    this.sectionDetailsForm = this.fb.group({
      subjectSections: this.fb.array([])
    });
  }

  get subjects() {
    return this.subjectDetailsForm.get('subjects') as FormArray<any>;
  }

  createSubject() {
    return this.fb.group({
      name: ['Subject 1', Validators.required],
      sectionsCount: [1, Validators.required]
    });
  }

  addSubject() {
    this.subjects.push(this.createSubject() as any);
  }

  removeSubject(index: number) {
    this.subjects.removeAt(index);
  }

  onSubjectsCountChange() {
    const count = this.subjectDetailsForm.get('subjectsCount')?.value;
    while (this.subjects.length < count) {
      this.subjects.push(this.fb.group({
        name: `Subject ${this.subjects.length + 1}`,
        sectionsCount: [1, Validators.required]
      }) as any);
    }
    while (this.subjects.length > count) {
      this.subjects.removeAt(this.subjects.length - 1);
    }
  }

  generateSections() {
    const sectionsArray = this.sectionDetailsForm.get('subjectSections') as FormArray<any>;
    sectionsArray.clear();

    this.subjects.controls.forEach((subjectControl: any) => {
      const subjectName = subjectControl.get('name')?.value;
      const sectionsCount = subjectControl.get('sectionsCount')?.value;

      const sections = this.fb.array<any>([]);
      for (let i = 0; i < sectionsCount; i++) {
        sections.push(this.fb.group({
          sectionName: [`Section ${i + 1}`, Validators.required],
          numQuestions: [1, Validators.required],
          questionType: ['5 option', Validators.required],
          marksCorrect: [1, Validators.required],
          marksIncorrect: [0, Validators.required],
          allowPartialMarks: [false],
          allowOptionalAttempts: [false]
        }) as any);
      }

      sectionsArray.push(this.fb.group({
        subjectName: [subjectName],
        sections: sections
      }) as any);
    });
  }

  get subjectSections() {
    return this.sectionDetailsForm.get('subjectSections') as FormArray;
  }

  getSections(index: number) {
    return (this.subjectSections.at(index).get('sections') as FormArray).controls;
  }

  getRange(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  getBubbleLabels(type: string): string[] {
    if (type === '4 option') return ['A', 'B', 'C', 'D'];
    if (type === '5 option') return ['A', 'B', 'C', 'D', 'E'];
    return ['A', 'B', 'C', 'D', 'E'];
  }

  startCreateExam() {
    this.isCreatingExam.set(true);
    this.isEditing.set(false);
    this.isViewingDetails.set(false);
    this.initForms(); // Reset forms when starting fresh
  }

  editExam(exam: any) {
    this.isCreatingExam.set(true);
    this.isEditing.set(true);
    this.isViewingDetails.set(false);
    this.selectedExam = exam;
    
    // Pre-fill basic details
    this.basicDetailsForm.patchValue({
      className: exam.className,
      examName: exam.name,
      examDate: new Date(exam.date),
      examMode: exam.mode || 'Offline'
    });

    // Note: To fully support editing, we would also need to populate subjects and sections
    // if they are part of the exam data returned from the API.
  }

  cancelCreate() {
    this.isCreatingExam.set(false);
    this.isEditing.set(false);
    this.fetchExams(); // Refresh list when cancelling
  }

  viewDetails(exam: any) {
    this.selectedExam = exam;
    this.isViewingDetails.set(true);
    this.isCreatingExam.set(false);
  }

  closeDetails() {
    this.isViewingDetails.set(false);
    this.selectedExam = null;
  }

  deleteExam(exam: any) {
    this.examToDelete.set(exam);
    this.showDeleteModal.set(true);
  }

  onConfirmDelete() {
    const exam = this.examToDelete();
    if (exam) {
      this.http.delete(`http://localhost:3000/exams/${exam.id}`).subscribe({
        next: () => {
          console.log('Exam deleted successfully');
          this.showDeleteModal.set(false);
          this.examToDelete.set(null);
          this.fetchExams(); // Refresh list
        },
        error: (error) => {
          console.error('Error deleting exam:', error);
        }
      });
    }
  }

  onCancelDelete() {
    this.showDeleteModal.set(false);
    this.examToDelete.set(null);
  }

  onClassChange(event: any) {
    if (event.value === 'ADD_NEW') {
      // Save current form state to localStorage!
      const currentState = {
        basic: this.basicDetailsForm.value,
        subject: this.subjectDetailsForm.value,
        section: this.sectionDetailsForm.value
      };
      localStorage.setItem('pendingExamState', JSON.stringify(currentState));
      
      // Navigate to create class screen!
      this.router.navigate(['/dashboard/classes'], { queryParams: { action: 'create' } });
    }
  }

  submit() {
    const examData = {
      name: this.basicDetailsForm.value.examName,
      className: this.basicDetailsForm.value.className,
      date: this.basicDetailsForm.value.examDate,
      mode: this.basicDetailsForm.value.examMode,
      rollNoDigits: this.subjectDetailsForm.value.rollNoDigits,
      examSets: this.subjectDetailsForm.value.examSets,
      structure: {
        subjects: this.subjectDetailsForm.value.subjects,
        sections: this.sectionDetailsForm.value.subjectSections
      }
    };

    console.log('Submitting Exam Data...', examData);

    if (this.isEditing()) {
      this.http.put(`http://localhost:3000/exams/${this.selectedExam.id}`, examData).subscribe({
        next: (response) => {
          console.log('Exam updated successfully:', response);
          this.isCreatingExam.set(false);
          this.isEditing.set(false);
          this.isViewingDetails.set(false);
          this.fetchExams(); // Refresh list after update
        },
        error: (error) => {
          console.error('Error updating exam:', error);
        }
      });
    } else {
      this.http.post('http://localhost:3000/exams', examData).subscribe({
        next: (response) => {
          console.log('Exam created successfully:', response);
          this.isCreatingExam.set(false);
          this.fetchExams(); // Refresh list after creation
        },
        error: (error) => {
          console.error('Error creating exam:', error);
        }
      });
    }
  }
}
