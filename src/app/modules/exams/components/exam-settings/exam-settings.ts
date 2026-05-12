import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-exam-settings',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './exam-settings.html',
  styleUrl: './exam-settings.scss',
})
export class ExamSettings {
  activeTab = signal('Exam marks');
  tabs = ['Exam marks', 'Headers', 'Labels', 'Grades', 'Invalid questions', 'Ranking method'];

  showSectionModal = signal(false);
  selectedSection = signal<any>(null);

  subjects = [
    {
      name: 'Physics',
      sections: [
        { id: 1, name: 'Section 1', correct: 1, incorrect: 0, qType: '5 option', questions: 10 },
        { id: 2, name: 'Section 2', correct: 1, incorrect: 0, qType: '4 option', questions: 10 }
      ]
    },
    {
      name: 'Chemistry',
      sections: [
        { id: 3, name: 'Section 1', correct: 1, incorrect: 0, qType: '5 option', questions: 10 },
        { id: 4, name: 'Section 2', correct: 1, incorrect: 0, qType: '5 option', questions: 10 }
      ]
    },
    {
      name: 'Maths',
      sections: [
        { id: 5, name: 'Section 1', correct: 1, incorrect: 0, qType: '5 option', questions: 10 }
      ]
    }
  ];

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  openSectionModal(section: any) {
    this.selectedSection.set(section);
    this.showSectionModal.set(true);
  }

  closeSectionModal() {
    this.showSectionModal.set(false);
  }
}

