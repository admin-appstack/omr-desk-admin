import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-exam-settings',
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './exam-settings.html',
  styleUrl: './exam-settings.scss',
})
export class ExamSettings {
  activeTab = signal('Exam marks');
  tabs = ['Exam marks', 'Headers', 'Labels', 'Grades', 'Invalid questions', 'Ranking method'];

  showSectionModal = signal(false);
  isTitleEnabled = signal(true);
  selectedSection = signal<any>(null);
  showAddHeaderModal = signal(false);
  headers = signal(['None', 'Default', 'Skylight Academy']);
  labelCount = signal(2);
  labelsList = signal([
    { srNo: 1, label: 'NAME', size: 'Medium' },
    { srNo: 2, label: 'Email', size: 'Small' }
  ]);

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

  openAddHeaderModal() {
    this.showAddHeaderModal.set(true);
  }

  closeAddHeaderModal() {
    this.showAddHeaderModal.set(false);
  }

  onHeaderChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'Add new') {
      this.openAddHeaderModal();
      // Reset selection to a valid option so it doesn't stay on "Add new"
      (event.target as HTMLSelectElement).value = 'Skylight Academy';
    }
  }

  incrementLabels() {
    this.labelCount.update(val => val + 1);
    this.labelsList.update(list => [
      ...list,
      { srNo: this.labelCount(), label: `Label ${this.labelCount()}`, size: 'Medium' }
    ]);
  }

  decrementLabels() {
    if (this.labelCount() > 1) {
      this.labelCount.update(val => val - 1);
      this.labelsList.update(list => list.slice(0, -1));
    }
  }
}

