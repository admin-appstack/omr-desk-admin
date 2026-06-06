import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TemplateGridComponent } from './components/template-grid/template-grid.component';
import { PageManagementComponent } from './components/page-management/page-management.component';
import { BrandingSettingsComponent } from './components/branding-settings/branding-settings.component';
import { InstituteWebsiteService, WebsiteConfig } from './service/institute-website.service';
import { SnackBarService } from '../../common/services/snackbar.service';

@Component({
  selector: 'app-institute-website',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    TemplateGridComponent,
    PageManagementComponent,
    BrandingSettingsComponent,
  ],
  templateUrl: './institute-website.component.html',
  styleUrls: ['./institute-website.component.scss'],
})
export class InstituteWebsiteComponent implements OnInit {
  selectedTemplate = signal(1);
  activeStep = 0;

  // Loaded from API
  config: WebsiteConfig | null = null;
  isLive = false;
  isTogglingLive = false;
  isLoading = true;

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private websiteService: InstituteWebsiteService,
  ) {}

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig(): void {
    this.isLoading = true;
    this.websiteService.getConfig().subscribe({
      next: (config) => {
        this.config = config;
        this.isLive = config.isPublished;
        this.selectedTemplate.set(config.templateId ?? 1);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBarService.showError('Could not load website configuration.');
      },
    });
  }

  onTemplateSelected(id: number): void {
    this.selectedTemplate.set(id);
    // Persist template selection immediately
    this.websiteService.updateConfig({ templateId: id }).subscribe();
  }

  toggleLive(): void {
    this.isTogglingLive = true;
    this.websiteService.toggleLive().subscribe({
      next: (updated) => {
        this.isLive = updated.isPublished;
        if (this.config) {
          this.config.isPublished = updated.isPublished;
        }
        this.isTogglingLive = false;
        const message = this.isLive
          ? 'Website is now LIVE and publicly accessible.'
          : 'Website has been taken OFFLINE.';
        
        if (this.isLive) {
          this.snackBarService.showSuccess(message);
        } else {
          this.snackBarService.showWarning(message);
        }
      },
      error: () => {
        this.isTogglingLive = false;
        this.snackBarService.showError('Failed to toggle website status.');
      },
    });
  }
}

