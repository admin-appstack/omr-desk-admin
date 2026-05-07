import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

export interface SettingsDialogData {
  type: 'appearance' | 'branding' | 'general';
  templateName: string;
  config: any;
}

@Component({
  selector: 'app-template-settings-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatTabsModule,
    MatButtonToggleModule
  ],
  templateUrl: './template-settings-dialog.component.html',
  styleUrls: ['./template-settings-dialog.component.scss']
})
export class TemplateSettingsDialog {
  config: any;
  activeTab: number = 0;

  fontFamilies = [
    { name: 'Inter (Sans)', value: "'Inter', sans-serif" },
    { name: 'Roboto (Modern)', value: "'Roboto', sans-serif" },
    { name: 'Outfit (Premium)', value: "'Outfit', sans-serif" },
    { name: 'JetBrains Mono', value: "'JetBrains Mono', monospace" }
  ];

  themePresets = [
    { p: '#6366f1', s: '#a855f7', a: '#ec4899' },
    { p: '#3b82f6', s: '#06b6d4', a: '#10b981' },
    { p: '#f59e0b', s: '#f97316', a: '#ef4444' },
    { p: '#10b981', s: '#22c55e', a: '#84cc16' },
    { p: '#334155', s: '#475569', a: '#64748b' },
    { p: '#9f1239', s: '#be185d', a: '#f43f5e' }
  ];

  applyPreset(preset: any) {
    this.config.primaryColor = preset.p;
    this.config.secondaryColor = preset.s;
    this.config.accentColor = preset.a;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SettingsDialogData,
    private dialogRef: MatDialogRef<TemplateSettingsDialog>
  ) {
    this.config = { ...data.config };
    if (data.type === 'branding') this.activeTab = 0;
    if (data.type === 'appearance') this.activeTab = 1;
    if (data.type === 'general') this.activeTab = 2;
  }

  save() {
    this.dialogRef.close(this.config);
  }
}
