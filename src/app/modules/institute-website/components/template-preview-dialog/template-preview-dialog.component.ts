import { Component, Inject, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
export class TemplatePreviewDialog implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('previewScroll') previewScrollRef!: ElementRef<HTMLDivElement>;
  isLoading = true;
  /** Safe Blob URL used as iframe [src] so that script tags are NOT stripped. */
  iframeSrc: SafeResourceUrl | null = null;
  iframeScale = 0.5; // will be recalculated after view init
  iframeHeightPercent = 200; // will be recalculated after view init

  /** Holds the current blob URL so we can revoke it on destroy to avoid memory leaks. */
  private _blobUrl: string | null = null;

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
          // Compute scale after the *ngIf renders the preview-scroll div
          setTimeout(() => this.computeScale(), 0);
        })
      )
      .subscribe({
        next: (tpl) => {
          if (!tpl) return;

          let htmlContent = tpl.htmlContent || '';
          // Fix any bare `= ;` patterns left by unresolved Handlebars expressions
          // e.g.  `const mockDb = ;`  ->  `const mockDb = [];`
          htmlContent = htmlContent.replace(/(\bconst\s+\w+\s*=)\s*;/g, '$1 [];');
          htmlContent = htmlContent.replace(/(\bvar\s+\w+\s*=)\s*;/g, '$1 [];');
          htmlContent = htmlContent.replace(/(\blet\s+\w+\s*=)\s*;/g, '$1 [];');

          const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
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
    ${htmlContent}
  </body>
</html>`;

          // Create a Blob URL — this is the ONLY correct way to load a full HTML
          // document (including <script> tags) into an iframe from Angular,
          // because Angular's DomSanitizer strips script tags from SafeHtml / srcdoc.
          const blob = new Blob([fullHtml], { type: 'text/html' });
          if (this._blobUrl) {
            URL.revokeObjectURL(this._blobUrl);
          }
          this._blobUrl = URL.createObjectURL(blob);
          this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this._blobUrl);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to load template preview', err);
          this.cdr.detectChanges();
        }
      });
  }

  ngAfterViewInit(): void {
    this.computeScale();
  }

  ngOnDestroy(): void {
    if (this._blobUrl) {
      URL.revokeObjectURL(this._blobUrl);
    }
  }

  @HostListener('window:resize')
  computeScale(): void {
    if (this.previewScrollRef) {
      const containerWidth = this.previewScrollRef.nativeElement.clientWidth;
      this.iframeScale = containerWidth > 0 ? (containerWidth / 1280) : 0.5;
      this.iframeHeightPercent = 100 / this.iframeScale;
      this.cdr.detectChanges();
    }
  }

  selectTemplate(): void {
    this.dialogRef.close(true);
  }

  getSlug(): string {
    return this.data.name.toLowerCase().replace(/\s+/g, '-');
  }
}
