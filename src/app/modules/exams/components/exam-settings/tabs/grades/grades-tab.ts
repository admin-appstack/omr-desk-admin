import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-grades-tab',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    FormsModule, 
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './grades-tab.html',
  styleUrl: './grades-tab.scss'
})
export class GradesTabComponent {
  newGrade = signal('');
  newMinMarks = signal('');
  newMaxMarks = signal('');

  gradesList = signal([
    { grade: 'A', min: 95.0, max: 100.0 },
    { grade: 'B', min: 80.0, max: 95.0 }
  ]);

  addGrade() {
    if (this.newGrade() && this.newMinMarks() && this.newMaxMarks()) {
      this.gradesList.update(list => [
        ...list,
        { 
          grade: this.newGrade(), 
          min: parseFloat(this.newMinMarks()), 
          max: parseFloat(this.newMaxMarks()) 
        }
      ]);
      // Reset inputs
      this.newGrade.set('');
      this.newMinMarks.set('');
      this.newMaxMarks.set('');
    }
  }

  deleteGrade(index: number) {
    this.gradesList.update(list => list.filter((_, i) => i !== index));
  }
}
