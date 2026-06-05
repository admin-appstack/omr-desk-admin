import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EditPageDialog } from '../edit-page-dialog/edit-page-dialog';
import { PageSettingsDialog } from '../page-settings-dialog/page-settings-dialog';
import { InstituteWebsiteService, PageMeta } from '../../service/institute-website.service';

@Component({
  selector: 'app-page-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss'],
})
export class PageManagementComponent implements OnInit {
  pages: PageMeta[] = [];
  isLoading = true;
  togglingPages = new Set<string>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private websiteService: InstituteWebsiteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages(): void {
    this.isLoading = true;
    this.websiteService.getAllPages().subscribe({
      next: (pages) => {
        this.pages = pages;
        this.isLoading = false;
        this.cdr.detectChanges(); // Force view update
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.snackBar.open('⚠️ Failed to load pages.', 'Close', { duration: 3000 });
      },
    });
  }

  onTogglePublished(page: PageMeta): void {
    // ngModel already flipped the value — capture it and call the API
    const newValue = page.isPublished;
    this.togglingPages.add(page.pageName);

    this.websiteService.togglePagePublished(page.pageName, newValue)
      .pipe(
        finalize(() => {
          this.togglingPages.delete(page.pageName);
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          // Success handled in finalize
        },
        error: () => {
          // Revert toggle on error
          page.isPublished = !newValue;
          this.snackBar.open(`❌ Failed to update "${page.displayName}" status.`, 'Close', { duration: 3000 });
        },
      });
  }

  isToggling(pageName: string): boolean {
    return this.togglingPages.has(pageName);
  }

  openEditDialog(page: PageMeta): void {
    const ref = this.dialog.open(EditPageDialog, {
      width: '800px',
      height: '90vh',
      maxHeight: '90vh',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: { name: page.displayName, pageName: page.pageName },
    });

    ref.afterClosed().subscribe((saved) => {
      if (saved) {
        this.loadPages();
        this.snackBar.open('✅ Page content saved successfully!', 'Dismiss', { duration: 3000 });
      }
    });
  }

  openSettingsDialog(page: PageMeta): void {
    this.dialog.open(PageSettingsDialog, {
      width: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: page,
    });
  }

  getTimeAgo(dateStr: string | null): string {
    if (!dateStr) return 'Never updated';
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
