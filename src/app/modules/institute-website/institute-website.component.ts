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
import { environment } from '../../../environments/environment';

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
  isLive = signal(false);
  isTogglingLive = signal(false);
  isPublishing = signal(false);
  isLoading = signal(true);

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private websiteService: InstituteWebsiteService,
  ) {}

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig(): void {
    this.isLoading.set(true);
    this.websiteService.getConfig().subscribe({
      next: (config) => {
        this.config = config;
        this.isLive.set(config.isPublished);
        this.selectedTemplate.set(config.templateId ?? 1);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
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
    if (this.isTogglingLive()) return; // Prevent double-click while request is in-flight
    this.isTogglingLive.set(true);
    this.websiteService.toggleLive().subscribe({
      next: (updated) => {
        const newState = updated.isPublished; // Read truth directly from API response
        this.isLive.set(newState);
        if (this.config) {
          this.config.isPublished = newState;
        }
        this.isTogglingLive.set(false);
        const message = newState
          ? 'Website is now LIVE and publicly accessible.'
          : 'Website has been taken OFFLINE.';

        if (newState) {
          this.snackBarService.showSuccess(message);
        } else {
          this.snackBarService.showWarning(message);
        }
      },
      error: (err) => {
        this.isTogglingLive.set(false);
        this.snackBarService.showError('Failed to toggle website status.');
      }
    });
  }

  /** Returns the public URL for this institute's site. */
  get siteUrl(): string {
    const slug = this.config?.institute?.slug ?? 'my-institute';
    return `${environment.siteBaseUrl}/${slug}`;
  }

  visitSite(): void {
    window.open(this.siteUrl, '_blank', 'noopener,noreferrer');
  }

  saveAndPublish(): void {
    if (this.isPublishing()) return;
    this.isPublishing.set(true);
    this.websiteService.updateConfig({ isPublished: true }).subscribe({
      next: (updated) => {
        this.isLive.set(updated.isPublished);
        if (this.config) {
          this.config.isPublished = updated.isPublished;
        }
        this.isPublishing.set(false);
        this.snackBarService.showSuccess('Website saved and published successfully!');
      },
      error: (err) => {
        this.isPublishing.set(false);
        this.snackBarService.showError('Failed to publish website.');
      }
    });
  }
}

