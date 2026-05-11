import { Component } from '@angular/core';
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
    MatRadioModule
  ],
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

  showAddForm = false;
  questionType = 'mcq';
  newQuestion = {
    text: '',
    subject: '',
    difficulty: 'Easy',
    options: ['', '', '', ''],
    correctAnswer: 0
  };

  subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  difficulties = ['Easy', 'Medium', 'Hard'];

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  saveQuestion() {
    const newId = Math.floor(Math.random() * 1000) + 2000;
    this.questions.push({
      id: newId,
      text: this.newQuestion.text,
      subject: this.newQuestion.subject,
      difficulty: this.newQuestion.difficulty
    });
    this.showAddForm = false;
    this.newQuestion = {
      text: '',
      subject: '',
      difficulty: 'Easy',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
  }
}
