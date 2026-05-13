import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddLabelModalComponent } from '../../modals/add-label/add-label';

@Component({
  selector: 'app-labels-tab',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, AddLabelModalComponent],
  templateUrl: './labels-tab.html',
  styleUrl: './labels-tab.scss'
})
export class LabelsTabComponent {
  showAddLabelModal = signal(false);

  openAddLabelModal() {
    this.showAddLabelModal.set(true);
  }

  closeAddLabelModal() {
    this.showAddLabelModal.set(false);
  }

  onLabelChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'Add new') {
      this.openAddLabelModal();
      // Reset selection to a valid option
      (event.target as HTMLSelectElement).value = 'Label Name Options';
    }
  }
}
