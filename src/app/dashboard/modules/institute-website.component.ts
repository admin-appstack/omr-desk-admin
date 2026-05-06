import { CommonModule } from '@angular/common';
import { Component, Inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'template-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>{{data.name}} - Full Preview</h2>
        <button mat-icon-button mat-dialog-close><mat-icon>close</mat-icon></button>
      </div>
      <div class="dialog-content">
        <div class="preview-main">
          <!-- Browser Frame Mockup -->
          <div class="browser-frame">
            <div class="browser-header">
              <div class="dots"><span></span><span></span><span></span></div>
              <div class="address-bar">https://{{data.name.toLowerCase().replace(' ', '-')}}.omrdesk.com</div>
            </div>
            <div class="preview-img-wrapper mock-website" [style.--primary]="data.primaryColor">
              <!-- Mock Website Header -->
              <div class="mock-header">
                <div class="mock-logo">
                  <mat-icon>business</mat-icon>
                  <span>{{data.name}}</span>
                </div>
                <div class="mock-nav">
                  <span>Home</span><span>Courses</span><span>Results</span><span>Contact</span>
                </div>
              </div>

              <!-- Mock Hero Section -->
              <div class="mock-hero">
                <h1>Leading Institute for <br/><span>Competitive Exams</span></h1>
                <p>Prepare for JEE, NEET and other competitive exams with India's most advanced OMR based testing platform.</p>
                <div class="hero-btns">
                  <div class="btn-mock primary">Enroll Now</div>
                  <div class="btn-mock">Learn More</div>
                </div>
              </div>

              <!-- Mock Stats -->
              <div class="mock-stats">
                <div class="m-stat"><h3>10K+</h3><p>Students</p></div>
                <div class="m-stat"><h3>500+</h3><p>Tests</p></div>
                <div class="m-stat"><h3>98%</h3><p>Success</p></div>
              </div>

              <!-- Mock Courses -->
              <div class="mock-courses">
                <h2>Our Popular Courses</h2>
                <div class="m-course-grid">
                  <div class="m-course" *ngFor="let c of [1,2,3]">
                    <div class="m-course-img"></div>
                    <div class="m-course-info">
                      <div class="m-line"></div>
                      <div class="m-line short"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mock Footer -->
              <div class="mock-footer">
                <div class="f-logo"><mat-icon>business</mat-icon> {{data.name}}</div>
                <p>© 2024. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-actions">
        <button mat-stroked-button mat-dialog-close>Close</button>
        <button mat-raised-button color="primary" [mat-dialog-close]="true">Use This Template</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container { padding: 1.5rem; }
    .dialog-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .dialog-header h2 { margin: 0; font-weight: 800; }
    
    .dialog-content { display: grid; grid-template-cols: 1fr; gap: 2.5rem; }
    
    .browser-frame {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 20px 50px -15px rgba(0,0,0,0.15);
      background: white;
    }

    .browser-header {
      background: #f1f5f9;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .dots { display: flex; gap: 6px; }
    .dots span { width: 10px; height: 10px; border-radius: 50%; background: #cbd5e1; }
    .address-bar {
      background: white;
      border-radius: 6px;
      padding: 4px 12px;
      flex: 1;
      font-size: 0.75rem;
      color: #64748b;
      border: 1px solid #e2e8f0;
    }

    .preview-img-wrapper { height: 450px; overflow-y: auto; background: white; }
    
    .mock-website {
      font-family: 'Inter', sans-serif;
      --primary: #133e87;
      
      .mock-header {
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        position: sticky; top: 0; z-index: 10;
        
        .mock-logo { display: flex; align-items: center; gap: 0.5rem; font-weight: 800; color: var(--primary); mat-icon { font-size: 24px; } }
        .mock-nav { display: flex; gap: 1.5rem; font-size: 0.8rem; font-weight: 600; color: #475569; }
      }

      .mock-hero {
        padding: 4rem 2rem;
        text-align: center;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        
        h1 { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.2; color: #1e293b; }
        h1 span { color: var(--primary); }
        p { max-width: 500px; margin: 0 auto 2rem; font-size: 0.9rem; color: #64748b; line-height: 1.6; }
        
        .hero-btns { display: flex; justify-content: center; gap: 1rem; }
        .btn-mock { padding: 0.6rem 1.5rem; border-radius: 8px; font-weight: 700; font-size: 0.8rem; border: 2px solid var(--primary); color: var(--primary); cursor: pointer; }
        .btn-mock.primary { background: var(--primary); color: white; }
      }

      .mock-stats {
        display: grid;
        grid-template-cols: repeat(3, 1fr);
        padding: 2rem;
        background: var(--primary);
        color: white;
        text-align: center;
        
        h3 { font-size: 1.5rem; font-weight: 800; margin: 0; }
        p { font-size: 0.75rem; margin: 0.25rem 0 0; opacity: 0.8; }
      }

      .mock-courses {
        padding: 3rem 2rem;
        h2 { text-align: center; margin-bottom: 2rem; font-weight: 800; }
        
        .m-course-grid { display: grid; grid-template-cols: repeat(3, 1fr); gap: 1.5rem; }
        .m-course { background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
        .m-course-img { height: 100px; background: #cbd5e1; }
        .m-course-info { padding: 1rem; }
        .m-line { height: 8px; background: #e2e8f0; border-radius: 4px; margin-bottom: 0.5rem; }
        .m-line.short { width: 60%; }
      }

      .mock-footer {
        padding: 2rem;
        background: #1e293b;
        color: white;
        text-align: center;
        .f-logo { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 700; margin-bottom: 0.5rem; mat-icon { font-size: 20px; } }
        p { font-size: 0.7rem; opacity: 0.6; margin: 0; }
      }
    }
    
    .thumb-mock {
      height: 80px; border-radius: 8px; border: 1px solid #e2e8f0;
      display: flex; align-items: center; justify-content: center;
      mat-icon { font-size: 32px; width: 32px; height: 32px; }
    }

    .tpl-summary-text { font-size: 0.9rem; line-height: 1.6; color: #475569; margin: 1rem 0; }

    .template-stats {
      margin-top: 1.5rem; padding: 1.25rem; background: #f8fafc; border: none;
      display: flex; justify-content: space-around;
      .stat { display: flex; flex-direction: column; align-items: center; }
      .label { font-size: 0.7rem; text-transform: uppercase; color: #94a3b8; font-weight: 700; }
      .val { font-size: 0.9rem; font-weight: 700; color: #133e87; }
    }
    .features-list li { display: flex; align-items: center; gap: 0.5rem; font-weight: 500; color: #475569; }
    .features-list mat-icon { color: #059669; font-size: 20px; width: 20px; height: 20px; }
    
    .color-info { display: flex; align-items: center; gap: 1rem; margin-top: 2rem; }
    .color-swatch { width: 40px; height: 20px; border-radius: 4px; }
    
    .dialog-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #f1f5f9; }
  `]
})
export class TemplatePreviewDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'institute-website',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule
  ],
  template: `
    <div class="module-container">
      <div class="module-header">
        <div>
          <h1>Institute Website Builder</h1>
          <p>Configure your public portal, select templates, and manage content.</p>
        </div>
        <div class="header-actions">
          <button mat-stroked-button color="primary">
            <mat-icon>visibility</mat-icon>
            Live Preview
          </button>
          <button mat-raised-button color="primary">
            <mat-icon>save</mat-icon>
            Save Changes
          </button>
        </div>
      </div>

      <mat-tab-group class="website-tabs">
        <!-- Template Selection -->
        <mat-tab label="1. Choose Template">
          <div class="tab-content">
            <div class="template-grid">
              <div 
                *ngFor="let tpl of templates" 
                class="template-card" 
                [class.selected]="selectedTemplate() === tpl.id"
                (click)="selectedTemplate.set(tpl.id)"
              >
                <div class="preview-trigger" (click)="$event.stopPropagation(); openPreview(tpl)" title="Detailed Preview">
                  <mat-icon>zoom_in</mat-icon>
                </div>
                <div class="template-preview">
                  <img [src]="tpl.image" [alt]="tpl.name" />
                  <div class="selection-overlay">
                    <mat-icon>check_circle</mat-icon>
                  </div>
                </div>
                <div class="template-info">
                  <div class="template-header-row">
                    <h3>{{tpl.name}}</h3>
                    <div class="tag-row">
                      <span *ngFor="let tag of tpl.tags" class="tpl-tag">{{tag}}</span>
                    </div>
                  </div>
                  <p>{{tpl.description}}</p>
                  <div class="template-actions">
                    <button mat-button color="primary" (click)="$event.stopPropagation(); openPreview(tpl)">
                      <mat-icon>zoom_in</mat-icon>
                      Detailed Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- General Settings -->
        <mat-tab label="2. Basic Information">
          <div class="tab-content form-view">
            <mat-card class="settings-card">
              <h3>Institute Branding</h3>
              <div class="form-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Institute Name</mat-label>
                  <input matInput placeholder="e.g. OMRDesk Academy" />
                </mat-form-field>
                
                <mat-form-field appearance="outline">
                  <mat-label>Subdomain</mat-label>
                  <input matInput placeholder="e.g. academy" />
                  <span matSuffix>.omrdesk.com</span>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Tagline</mat-label>
                  <input matInput placeholder="e.g. Excellence in Education" />
                </mat-form-field>

                <div class="logo-upload full-width">
                  <div class="logo-preview">
                    <mat-icon>business</mat-icon>
                  </div>
                  <div class="upload-info">
                    <h4>Institute Logo</h4>
                    <p>PNG or JPG, Recommended size 200x200px</p>
                    <button mat-button color="primary">Change Logo</button>
                  </div>
                </div>
              </div>
            </mat-card>

            <mat-card class="settings-card">
              <h3>Contact Details</h3>
              <div class="form-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Email Address</mat-label>
                  <input matInput type="email" />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Phone Number</mat-label>
                  <input matInput type="tel" />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Address</mat-label>
                  <textarea matInput rows="3"></textarea>
                </mat-form-field>
              </div>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Page Content -->
        <mat-tab label="3. Page Content">
          <div class="tab-content">
             <mat-card class="page-manager">
               <div class="page-row" *ngFor="let page of pages">
                 <div class="page-info">
                   <mat-icon>{{page.icon}}</mat-icon>
                   <div>
                     <h4>{{page.name}}</h4>
                     <p>Manage content for {{page.name}} page</p>
                   </div>
                 </div>
                 <div class="page-actions">
                   <button mat-icon-button><mat-icon>edit</mat-icon></button>
                   <button mat-icon-button color="warn"><mat-icon>visibility_off</mat-icon></button>
                 </div>
               </div>
             </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .module-container { display: flex; flex-direction: column; gap: 2rem; }
    .module-header { display: flex; justify-content: space-between; align-items: center; }
    .header-actions { display: flex; gap: 1rem; }
    
    .template-grid { 
      display: flex; 
      flex-wrap: wrap;
      gap: 1.5rem; 
      padding: 1.5rem 0;
    }
    
    .template-card { 
      width: 180px;
      cursor: pointer; 
      border-radius: 12px; 
      overflow: hidden; 
      background: white; 
      border: 2px solid transparent;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
      position: relative;
    }
    
    .template-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
    .template-card.selected { border-color: #133e87; }
    
    .template-preview { 
      aspect-ratio: 1 / 1;
      background: #f1f5f9; 
      position: relative; 
      overflow: hidden;
      
      img { width: 100%; height: 100%; object-fit: cover; }
    }
    
    .selection-overlay {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(19, 62, 135, 0.6);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.3s;
      mat-icon { color: white; font-size: 32px; width: 32px; height: 32px; }
    }
    .template-card.selected .selection-overlay { opacity: 1; }
    
    .template-info { 
      padding: 1rem; 
      text-align: center;
      h3 { margin: 0; font-size: 0.95rem; font-weight: 700; color: #1e293b; } 
    }

    /* Hide detailed info in grid view to maintain square look */
    .template-header-row .tag-row, 
    .template-info p,
    .template-actions { display: none; }

    /* Show preview button on hover as an overlay */
    .preview-trigger {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 5;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
      color: #133e87;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .template-card:hover .preview-trigger { opacity: 1; }
    
    .form-view { display: flex; flex-direction: column; gap: 1.5rem; padding-top: 1.5rem; }
    .settings-card { padding: 2rem; }
    .settings-card h3 { margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; }
    
    .form-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 1.5rem; }
    .full-width { grid-column: span 2; }
    
    .logo-upload { 
      display: flex; align-items: center; gap: 2rem; padding: 1.5rem; 
      background: #f8fafc; border-radius: 12px; border: 1px dashed #e2e8f0;
    }
    .logo-preview { 
      width: 80px; height: 80px; border-radius: 12px; background: white; 
      display: flex; align-items: center; justify-content: center;
      mat-icon { font-size: 40px; width: 40px; height: 40px; color: #94a3b8; }
    }
    .upload-info { h4 { margin: 0; } p { margin: 0.25rem 0 0.5rem; font-size: 0.85rem; color: #64748b; } }
    
    .page-manager { padding: 0; }
    .page-row { 
      display: flex; justify-content: space-between; align-items: center; 
      padding: 1.5rem 2rem; border-bottom: 1px solid #f1f5f9; 
    }
    .page-row:last-child { border-bottom: none; }
    .page-info { display: flex; align-items: center; gap: 1.5rem; }
    .page-info mat-icon { color: #133e87; }
    .page-info h4 { margin: 0; }
    .page-info p { margin: 0; font-size: 0.85rem; color: #64748b; }
  `]
})
export class InstituteWebsiteComponent {
  selectedTemplate = signal(1);

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

  pages = [
    { name: 'Home Page', icon: 'home' },
    { name: 'About Us', icon: 'info' },
    { name: 'Courses', icon: 'school' },
    { name: 'Contact Us', icon: 'contact_page' },
    { name: 'Test Series', icon: 'assignment' },
    { name: 'Recent Results', icon: 'emoji_events' },
  ];

  constructor(private dialog: MatDialog) {}

  openPreview(tpl: any): void {
    const dialogRef = this.dialog.open(TemplatePreviewDialog, {
      width: '900px',
      data: tpl
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.selectedTemplate.set(tpl.id);
      }
    });
  }
}
