import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SectionSettingsModalComponent } from '../../modals/section-settings/section-settings';

@Component({
  selector: 'app-exam-marks-tab',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, SectionSettingsModalComponent],
  templateUrl: './exam-marks.html',
  styleUrl: './exam-marks.scss'
})
export class ExamMarksTabComponent {
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
        { id: 4, name: 'Section 2', correct: 1, incorrect: 0, qType: '4 option', questions: 10 }
      ]
    }
  ];

  openSectionModal(section: any) {
    this.selectedSection.set(section);
    this.showSectionModal.set(true);
  }

  closeSectionModal() {
    this.showSectionModal.set(false);
  }
}
