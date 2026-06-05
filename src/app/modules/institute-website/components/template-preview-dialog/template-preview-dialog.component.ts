import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InstituteWebsiteService } from '../../service/institute-website.service';
import { ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';

export interface TemplatePreviewData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-template-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './template-preview-dialog.component.html',
  styleUrls: ['./template-preview-dialog.component.scss']
})
export class TemplatePreviewDialog implements OnInit {
  isLoading = true;
  safeSrcDoc: SafeHtml | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TemplatePreviewData,
    public dialogRef: MatDialogRef<TemplatePreviewDialog>,
    private instituteWebsiteService: InstituteWebsiteService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.instituteWebsiteService.getTemplateById(this.data.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (tpl) => {
          if (!tpl) return;
          const fullHtml = `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { margin: 0; padding: 0; }
                  ::-webkit-scrollbar { width: 8px; }
                  ::-webkit-scrollbar-track { background: #f1f1f1; }
                  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                  ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
                  ${tpl.cssContent || ''}
                </style>
              </head>
              <body>
                ${tpl.htmlContent || ''}
              </body>
            </html>
          `;
          this.safeSrcDoc = this.sanitizer.bypassSecurityTrustHtml(fullHtml);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to load template preview', err);
          this.cdr.detectChanges();
        }
      });
  }

  selectTemplate(): void {
    this.dialogRef.close(true);
  }

  getSlug(): string {
    return this.data.name.toLowerCase().replace(/\s+/g, '-');
  }
}
