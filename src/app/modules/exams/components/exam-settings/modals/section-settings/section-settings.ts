import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-section-settings-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './section-settings.html',
  styleUrl: './section-settings.scss'
})
export class SectionSettingsModalComponent {
  section = input<any>();
  close = output<void>();
}
