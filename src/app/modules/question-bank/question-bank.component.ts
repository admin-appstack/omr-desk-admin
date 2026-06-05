import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent {

  displayedColumns = ['id', 'text', 'subject', 'type', 'difficulty', 'actions'];
  questions = [
    { id: 1024, text: 'What is the speed of light in vacuum?', subject: 'Physics', type: '4 option', difficulty: 'Easy' },
    { id: 1025, text: 'Find the derivative of sin(x²) with respect to x...', subject: 'Mathematics', type: 'Numerical', difficulty: 'Medium' },
    { id: 1026, text: 'Define the process of Glycolysis in cells.', subject: 'Biology', type: 'Subjective', difficulty: 'Hard' },
    { id: 1027, text: 'What is the atomic number of Gold (Au)?', subject: 'Chemistry', type: '4 option', difficulty: 'Easy' },
    { id: 1028, text: 'State whether: Every integer is a rational number.', subject: 'Mathematics', type: 'TrueOrFalse', difficulty: 'Easy' },
  ];

  showAddForm = false;
  activeFilterSubject = 'All Subjects';
  tagInput = '';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  newQuestion: any = this.getEmptyQuestion();

  // ── Question Types (identical to Exams → Section Details) ──────────────────
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

  subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'History'];

  topicsMap: Record<string, string[]> = {
    Physics:      ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Modern Physics'],
    Chemistry:    ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry'],
    Mathematics:  ['Algebra', 'Calculus', 'Geometry', 'Trigonometry', 'Statistics'],
    Biology:      ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Botany'],
    English:      ['Grammar', 'Literature', 'Comprehension', 'Writing'],
    History:      ['Ancient History', 'Medieval History', 'Modern History', 'World History'],
  };

  subTopicsMap: Record<string, string[]> = {
    Mechanics:            ['Kinematics', "Newton's Laws", 'Work & Energy', 'Rotational Motion'],
    Thermodynamics:       ['Laws of Thermodynamics', 'Heat Transfer', 'Entropy'],
    Optics:               ['Reflection', 'Refraction', 'Wave Optics'],
    'Organic Chemistry':  ['Hydrocarbons', 'Alcohols & Ethers', 'Carbonyl Compounds'],
    Algebra:              ['Linear Equations', 'Quadratic Equations', 'Polynomials'],
    Calculus:             ['Differentiation', 'Integration', 'Limits & Continuity'],
    'Cell Biology':       ['Cell Structure', 'Cell Division', 'Cell Membrane'],
    Genetics:             ['Mendelian Genetics', 'DNA & RNA', 'Chromosomes'],
  };

  categories = ['Concept Based', 'Application', 'Analysis', 'Evaluation', 'Problem Solving', 'Memory Based', 'Formula Based'];
  difficulties = ['Easy', 'Medium', 'Hard'];
  filterSubjects = ['All Subjects', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

  // ── Derived helpers ────────────────────────────────────────────────────────
  get availableTopics(): string[] {
    return this.topicsMap[this.newQuestion.subject] || [];
  }

  get availableSubTopics(): string[] {
    return this.subTopicsMap[this.newQuestion.topic] || [];
  }

  /** Returns number of answer bubbles for the current question type */
  getOptionCount(): number {
    const type = this.newQuestion.questionType;
    const match = type?.match(/^(\d+)\s+option$/);
    if (match) return parseInt(match[1]);
    if (type === 'TrueOrFalse') return 2;
    return 0;
  }

  /** Ensures the options array is long enough, returns slice */
  getOptionsArray(): any[] {
    const count = this.getOptionCount();
    if (count === 0) return [];
    while (this.newQuestion.options.length < count) this.newQuestion.options.push('');
    return this.newQuestion.options.slice(0, count);
  }

  getOptionLabel(i: number): string {
    return 'ABCDEFGHIJ'[i] ?? `${i + 1}`;
  }

  /** True/False and N-option types show the options grid */
  isOptionType(): boolean {
    const t = this.newQuestion.questionType;
    return t === 'TrueOrFalse' || /^\d+\s+option$/.test(t);
  }

  // ── Tag management ─────────────────────────────────────────────────────────
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (!this.newQuestion.tags.includes(value)) {
        this.newQuestion.tags.push(value);
      }
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.newQuestion.tags.indexOf(tag);
    if (index >= 0) {
      this.newQuestion.tags.splice(index, 1);
    }
  }

  // ── Cascading selects ──────────────────────────────────────────────────────
  onSubjectChange() {
    this.newQuestion.topic = '';
    this.newQuestion.subTopic = '';
  }

  onTopicChange() {
    this.newQuestion.subTopic = '';
  }

  // ── Form lifecycle ─────────────────────────────────────────────────────────
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) this.resetForm();
  }

  saveQuestion() {
    const newId = Math.floor(Math.random() * 1000) + 2000;
    this.questions.unshift({
      id: newId,
      text: this.newQuestion.text,
      subject: this.newQuestion.subject,
      type: this.newQuestion.questionType,
      difficulty: this.newQuestion.difficulty
    });
    this.showAddForm = false;
    this.resetForm();
  }

  resetForm() {
    this.newQuestion = this.getEmptyQuestion();
    this.tagInput = '';
  }

  private getEmptyQuestion() {
    return {
      text: '',
      description: '',
      subject: '',
      topic: '',
      subTopic: '',
      category: '',
      difficulty: 'Easy',
      questionType: '4 option',
      tags: [] as string[],
      reference: '',
      numericalAnswer: null,
      options: ['', '', '', ''],
      correctAnswer: 0
    };
  }
}
