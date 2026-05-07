import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-branding-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonToggleModule],
  templateUrl: './branding-settings.component.html',
  styleUrls: ['./branding-settings.component.scss']
})
export class BrandingSettingsComponent {
  config = {
    primaryColor: '#6366f1',
    secondaryColor: '#a855f7',
    accentColor: '#ec4899',
    backgroundColor: '#ffffff',
    fontFamily: "'Inter', sans-serif"
  };

  themePresets = [
    { p: '#6366f1', s: '#a855f7', a: '#ec4899' },
    { p: '#3b82f6', s: '#06b6d4', a: '#10b981' },
    { p: '#f59e0b', s: '#f97316', a: '#ef4444' },
    { p: '#10b981', s: '#22c55e', a: '#84cc16' },
    { p: '#334155', s: '#475569', a: '#64748b' },
    { p: '#9f1239', s: '#be185d', a: '#f43f5e' }
  ];

  fontFamilies = [
    { name: 'Inter (Sans)', value: "'Inter', sans-serif" },
    { name: 'Roboto (Modern)', value: "'Roboto', sans-serif" },
    { name: 'Outfit (Premium)', value: "'Outfit', sans-serif" },
    { name: 'JetBrains Mono', value: "'JetBrains Mono', monospace" }
  ];

  applyPreset(preset: any) {
    this.config.primaryColor = preset.p;
    this.config.secondaryColor = preset.s;
    this.config.accentColor = preset.a;
  }
}
