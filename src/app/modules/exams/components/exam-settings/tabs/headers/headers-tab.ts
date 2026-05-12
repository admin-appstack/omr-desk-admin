import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddHeaderModalComponent } from '../../modals/add-header/add-header';

@Component({
  selector: 'app-headers-tab',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule,
    AddHeaderModalComponent
  ],
  templateUrl: './headers-tab.html',
  styleUrl: './headers-tab.scss'
})
export class HeadersTabComponent {
  showAddHeaderModal = signal(false);
  headers = signal(['None', 'Default', 'Skylight Academy']);

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
}
