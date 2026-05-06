import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatInputModule, MatChipsModule],
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent {
  displayedColumns = ['id', 'text', 'subject', 'difficulty', 'actions'];
  questions = [
    { id: 1024, text: 'What is the speed of light in vacuum?', subject: 'Physics', difficulty: 'Easy' },
    { id: 1025, text: 'Find the derivative of sin(x^2)...', subject: 'Mathematics', difficulty: 'Medium' },
    { id: 1026, text: 'Define the process of Glycolysis in cells.', subject: 'Biology', difficulty: 'Hard' },
    { id: 1027, text: 'What is the atomic number of Gold?', subject: 'Chemistry', difficulty: 'Easy' },
  ];
}
