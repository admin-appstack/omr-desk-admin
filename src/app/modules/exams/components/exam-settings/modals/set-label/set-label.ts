import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-set-label-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './set-label.html',
  styleUrl: './set-label.scss'
})
export class SetLabelModalComponent {
  option = input<any>();
  close = output<void>();

  values = computed(() => {
    const desc = this.option()?.desc;
    if (!desc) return [];
    // Split by comma and trim. Remove '4...' if present from the Question Number list
    return desc.split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v && v !== '4...');
  });
}
