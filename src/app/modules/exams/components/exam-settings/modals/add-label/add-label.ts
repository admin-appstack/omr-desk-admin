import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SetLabelModalComponent } from '../set-label/set-label';

@Component({
  selector: 'app-add-label-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    SetLabelModalComponent
  ],
  templateUrl: './add-label.html',
  styleUrl: './add-label.scss'
})
export class AddLabelModalComponent {
  close = output<void>();

  showSetLabelModal = signal(false);
  selectedOption = signal<any>(null);

  options = [
    { name: 'Roll No', desc: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9' },
    { name: 'True/False', desc: 'True, False' },
    { name: '3 Options', desc: 'A, B, C' },
    { name: '4 Options', desc: 'A, B, C, D' },
    { name: '5 Options', desc: 'A, B, C, D, E' },
    { name: '6 Options', desc: 'A, B, C, D, E, F' },
    { name: '8 Options', desc: 'A, B, C, D, E, F, G, H' },
    { name: '10 Options', desc: 'A, B, C, D, E, F, G, H, I, J' },
    { name: 'Matrix', desc: 'A, B, C, D, E, F, G, H, I, J, P, Q, R, S, T, U, V, W, X, Y' },
    { name: 'Numerical', desc: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9' },
    { name: 'Exam Set', desc: 'A, B, C, D, E, F, G, H, I, J' },
    { name: 'Question Number', desc: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 4...' },
    { name: 'Text Labels', desc: '' },
    { name: 'Answer Sheet', desc: 'Roll No, Exam Set' },
    { name: 'Student Report', desc: 'Name, Exam, Date, Report Card, Class, Grade, Rank, Subject, Marks, Percentage, Correct Answers, Incorrect Answers, Total Marks, Q No, Attempted, Correct, Percentile, Not Answered, Marked State, CI' }
  ];

  openSetLabelModal(option: any) {
    this.selectedOption.set(option);
    this.showSetLabelModal.set(true);
  }

  closeSetLabelModal() {
    this.showSetLabelModal.set(false);
  }
}
