import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

// Import Tab Components
import { ExamMarksTabComponent } from './tabs/exam-marks/exam-marks';
import { HeadersTabComponent } from './tabs/headers/headers-tab';
import { LabelsTabComponent } from './tabs/labels/labels-tab';
import { GradesTabComponent } from './tabs/grades/grades-tab';
import { InvalidQuestionsTabComponent } from './tabs/invalid-questions/invalid-questions-tab';
import { RankingMethodTabComponent } from './tabs/ranking-method/ranking-method-tab';

@Component({
  selector: 'app-exam-settings',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule,
    ExamMarksTabComponent,
    HeadersTabComponent,
    LabelsTabComponent,
    GradesTabComponent,
    InvalidQuestionsTabComponent,
    RankingMethodTabComponent
  ],
  templateUrl: './exam-settings.html',
  styleUrl: './exam-settings.scss',
})
export class ExamSettings {
  activeTab = signal('Exam marks');
  tabs = ['Exam marks', 'Headers', 'Labels', 'Grades', 'Invalid questions', 'Ranking method'];

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }
}
