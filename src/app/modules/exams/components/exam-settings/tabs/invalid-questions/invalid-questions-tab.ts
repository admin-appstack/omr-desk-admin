import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-invalid-questions-tab',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatCheckboxModule
  ],
  templateUrl: './invalid-questions-tab.html',
  styleUrl: './invalid-questions-tab.scss'
})
export class InvalidQuestionsTabComponent {
  subjects = signal([
    {
      name: 'Physics',
      sections: [
        { name: 'Section 1', questions: [{ id: 1, checked: true }] },
        { name: 'Section 2', questions: [{ id: 2, checked: true }] }
      ]
    },
    {
      name: 'Chemistry',
      sections: [
        { name: 'Section 1', questions: [{ id: 3, checked: true }] },
        { name: 'Section 2', questions: [{ id: 4, checked: true }] }
      ]
    }
  ]);
}
