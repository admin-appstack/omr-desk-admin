import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TemplatePreviewDialog } from '../template-preview-dialog/template-preview-dialog.component';

@Component({
  selector: 'app-template-grid',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './template-grid.component.html',
  styleUrls: ['./template-grid.component.scss']
})
export class TemplateGridComponent {
  @Input() selectedId: number = 1;
  @Output() selected = new EventEmitter<number>();

  templates = [
    { 
      id: 1, 
      name: 'Modern Academy', 
      description: 'Clean and minimal design for coaching centers.', 
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400',
      features: ['Hero Section with Video', 'Course Grid with Filters', 'Student Testimonials', 'Live Results Counter'],
      primaryColor: '#133e87',
      tags: ['Modern', 'Light']
    },
    { 
      id: 2, 
      name: 'Classic Institute', 
      description: 'Traditional layout with emphasis on results.', 
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400',
      features: ['Large Result Ticker', 'Faculty Profiles', 'Event Calendar', 'PDF Download Center'],
      primaryColor: '#1e40af',
      tags: ['Professional', 'Corporate']
    },
    { 
      id: 3, 
      name: 'Tech Portal', 
      description: 'Ideal for computer training and digital courses.', 
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400',
      features: ['Dark Mode Support', 'Interactive Code Blocks', 'LMS Integration', 'Webinar Booking'],
      primaryColor: '#7c3aed',
      tags: ['Dark Mode', 'Developer Ready']
    },
  ];

  constructor(private dialog: MatDialog) {}

  selectTemplate(id: number) {
    this.selected.emit(id);
  }

  openPreview(tpl: any): void {
    const dialogRef = this.dialog.open(TemplatePreviewDialog, {
      width: '80vw',
      height: '90vh',
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      data: tpl
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.selectTemplate(tpl.id);
      }
    });
  }
}
