import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-add-header-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './add-header.html',
  styleUrl: './add-header.scss'
})
export class AddHeaderModalComponent {
  close = output<void>();
  
  isTitleEnabled = signal(true);
  labelCount = signal(2);
  labelsList = signal([
    { srNo: 1, label: 'NAME', size: 'Medium' },
    { srNo: 2, label: 'Email', size: 'Small' }
  ]);

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
