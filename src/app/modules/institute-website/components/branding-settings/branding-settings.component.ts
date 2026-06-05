import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InstituteWebsiteService, WebsiteConfig } from '../../service/institute-website.service';

@Component({
  selector: 'app-branding-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './branding-settings.component.html',
  styleUrls: ['./branding-settings.component.scss'],
})
export class BrandingSettingsComponent implements OnInit {
  isLoading = true;
  isSaving = false;

  config: Partial<WebsiteConfig> = {
    subdomain: '',
    customDomain: '',
    primaryColor: '#6366f1',
    secondaryColor: '#a855f7',
    accentColor: '#ec4899',
    backgroundColor: '#ffffff',
    headingFont: "'Inter', sans-serif",
    bodyFont: "'Inter', sans-serif",
  };

  themePresets = [
    { p: '#6366f1', s: '#a855f7', a: '#ec4899' },
    { p: '#3b82f6', s: '#06b6d4', a: '#10b981' },
    { p: '#f59e0b', s: '#f97316', a: '#ef4444' },
    { p: '#10b981', s: '#22c55e', a: '#84cc16' },
    { p: '#334155', s: '#475569', a: '#64748b' },
    { p: '#9f1239', s: '#be185d', a: '#f43f5e' },
  ];

  fontFamilies = [
    { name: 'Inter (Sans)', value: "'Inter', sans-serif" },
    { name: 'Roboto (Modern)', value: "'Roboto', sans-serif" },
    { name: 'Outfit (Premium)', value: "'Outfit', sans-serif" },
    { name: 'JetBrains Mono', value: "'JetBrains Mono', monospace" },
  ];

  constructor(
    private websiteService: InstituteWebsiteService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig(): void {
    this.isLoading = true;
    this.websiteService.getConfig().subscribe({
      next: (data) => {
        this.config = {
          subdomain: data.subdomain ?? '',
          customDomain: data.customDomain ?? '',
          primaryColor: data.primaryColor ?? '#6366f1',
          secondaryColor: data.secondaryColor ?? '#a855f7',
          accentColor: data.accentColor ?? '#ec4899',
          backgroundColor: data.backgroundColor ?? '#ffffff',
          headingFont: data.headingFont ?? "'Inter', sans-serif",
          bodyFont: data.bodyFont ?? "'Inter', sans-serif",
        };
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  applyPreset(preset: { p: string; s: string; a: string }): void {
    this.config.primaryColor = preset.p;
    this.config.secondaryColor = preset.s;
    this.config.accentColor = preset.a;
  }

  saveConfig(): void {
    this.isSaving = true;
    this.websiteService.updateConfig(this.config).subscribe({
      next: () => {
        this.isSaving = false;
        this.snackBar.open('✅ Branding settings saved successfully!', 'Dismiss', {
          duration: 3500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      error: () => {
        this.isSaving = false;
        this.snackBar.open('❌ Failed to save branding settings.', 'Close', { duration: 4000 });
      },
    });
  }
}
