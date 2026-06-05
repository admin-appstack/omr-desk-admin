import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TemplatePreviewDialog } from '../template-preview-dialog/template-preview-dialog.component';
import { InstituteWebsiteService } from '../../service/institute-website.service';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-template-grid',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './template-grid.component.html',
  styleUrls: ['./template-grid.component.scss']
})
export class TemplateGridComponent implements OnInit {
  @Input() selectedId: number = 1;
  @Output() selected = new EventEmitter<number>();

  // Mock website config (should ideally come from a service)
  websiteConfig = {
    name: 'Modern Academy',
    tagline: 'Excellence in Education',
    subdomain: 'modern-academy',
    primaryColor: '#133e87',
    secondaryColor: '#1e3a8a',
    accentColor: '#3b82f6',
    backgroundColor: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    supportEmail: 'support@modern.com',
    phone: '+91 98765 43210'
  };

  templates: any[] = [];
  isLoading = true;

  constructor(
    private dialog: MatDialog,
    private instituteWebsiteService: InstituteWebsiteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.instituteWebsiteService.getTemplates()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res) => {
          this.templates = res || [];
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to load templates', err);
          this.cdr.detectChanges();
        }
      });
  }



  selectTemplate(id: number) {
    this.selected.emit(id);
  }

  openPreview(tpl: any): void {
    const dialogRef = this.dialog.open(TemplatePreviewDialog, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      panelClass: ['full-screen-dialog', 'no-padding-dialog'],
      data: tpl
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.selectTemplate(tpl.id);
      }
    });
  }
}
