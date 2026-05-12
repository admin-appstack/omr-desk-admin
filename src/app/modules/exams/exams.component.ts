import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  isCreatingExam = false;
  isViewingDetails = false;
  selectedExam: any = null;

  basicDetailsForm!: FormGroup;
  subjectDetailsForm!: FormGroup;
  sectionDetailsForm!: FormGroup;

  classes = ['Class 10', 'Class 11', 'Class 12'];
  questionTypes = ['4 option', '5 option', 'Numerical', 'Subjective'];
  marksOptions = [1, 2, 3, 4, 5];

  exams = signal<any[]>([]);
  displayedColumns: string[] = ['id', 'name', 'className', 'date', 'mode', 'status', 'actions'];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForms();
    this.fetchExams();
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
    this.isCreatingExam = true;
    this.isViewingDetails = false;
    this.initForms(); // Reset forms when starting fresh
  }

  cancelCreate() {
    this.isCreatingExam = false;
    this.fetchExams(); // Refresh list when cancelling
  }

  viewDetails(exam: any) {
    this.selectedExam = exam;
    this.isViewingDetails = true;
    this.isCreatingExam = false;
  }

  closeDetails() {
    this.isViewingDetails = false;
    this.selectedExam = null;
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

    console.log('Submitting Exam Data to http://localhost:3000/exams...', examData);

    this.http.post('http://localhost:3000/exams', examData).subscribe({
      next: (response) => {
        console.log('Exam created successfully:', response);
        this.isCreatingExam = false;
        this.fetchExams(); // Refresh list after creation
      },
      error: (error) => {
        console.error('Error creating exam:', error);
      }
    });
  }
}
