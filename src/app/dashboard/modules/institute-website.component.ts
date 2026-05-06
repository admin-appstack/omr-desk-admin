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
                <div class="mock-logo" (click)="setScreen('home')">
                  <mat-icon>business</mat-icon>
                  <span>{{data.name}}</span>
                </div>
                <div class="mock-nav">
                  <span [class.active]="activeScreen() === 'home'" (click)="setScreen('home')">Home</span>
                  <span [class.active]="activeScreen() === 'courses'" (click)="setScreen('courses')">Courses</span>
                  <span [class.active]="activeScreen() === 'results'" (click)="setScreen('results')">Results</span>
                  <span [class.active]="activeScreen() === 'contact'" (click)="setScreen('contact')">Contact</span>
                </div>
              </div>

              <!-- Main Content Area -->
              <div class="mock-content">
                
                <!-- Home Screen -->
                <div *ngIf="activeScreen() === 'home'" class="screen-home">
                  <div class="mock-hero">
                    <h1>Empowering Your <br/><span>Future Success</span></h1>
                    <p>Expert coaching for IIT-JEE, NEET, and Foundation courses with personalized OMR-based analytics.</p>
                    <div class="hero-btns">
                      <div class="btn-mock primary">Join Batch 2024</div>
                      <div class="btn-mock" (click)="setScreen('courses')">View Courses</div>
                    </div>
                  </div>
                  <div class="mock-stats">
                    <div class="m-stat"><h3>15+</h3><p>Years Excellence</p></div>
                    <div class="m-stat"><h3>2500+</h3><p>Selections</p></div>
                    <div class="m-stat"><h3>50+</h3><p>Top Centers</p></div>
                  </div>
                  <div class="mock-about-brief">
                    <h2>Premier Coaching Institute</h2>
                    <p>We combine traditional teaching excellence with cutting-edge technology to ensure every student reaches their full potential. Our integrated platform manages everything from OMR scanning to online result publication.</p>
                  </div>

                  <div class="mock-features-grid">
                    <div class="m-feat">
                      <mat-icon>psychology</mat-icon>
                      <h4>AI Analysis</h4>
                      <p>Detailed performance breakdown using AI.</p>
                    </div>
                    <div class="m-feat">
                      <mat-icon>speed</mat-icon>
                      <h4>Instant Results</h4>
                      <p>Get your OMR results within minutes.</p>
                    </div>
                    <div class="m-feat">
                      <mat-icon>trending_up</mat-icon>
                      <h4>Rank Ticker</h4>
                      <p>Live state-wide and center-wide ranking.</p>
                    </div>
                    <div class="m-feat">
                      <mat-icon>devices</mat-icon>
                      <h4>Hybrid Learning</h4>
                      <p>Access tests from any device, anywhere.</p>
                    </div>
                  </div>

                  <div class="mock-testimonials">
                    <h2>What Our Students Say</h2>
                    <div class="t-grid">
                      <div class="t-card">
                        <p>"The OMR analysis helped me identify my weak topics in Physics. The instant results are amazing!"</p>
                        <div class="t-user">
                          <div class="t-avatar">AA</div>
                          <div class="t-info"><strong>Ankit Aryan</strong><span>AIR 45, JEE 2023</span></div>
                        </div>
                      </div>
                      <div class="t-card">
                        <p>"Easy to use portal. I can check my rank and detailed scorecard right from my phone."</p>
                        <div class="t-user">
                          <div class="t-avatar">SR</div>
                          <div class="t-info"><strong>Sneha Reddy</strong><span>AIR 112, NEET 2023</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mock-news">
                    <div class="n-header">
                      <span>Latest Updates</span>
                      <div class="n-line"></div>
                    </div>
                    <ul class="n-list">
                      <li><mat-icon>chevron_right</mat-icon> Registration open for Scholarship Test 2024</li>
                      <li><mat-icon>chevron_right</mat-icon> New Batch starting for JEE Advanced from June 15th</li>
                    </ul>
                  </div>
                </div>

                <!-- Courses Screen -->
                <div *ngIf="activeScreen() === 'courses'" class="screen-courses">
                  <div class="mock-section-header">
                    <h2>Explore Our Courses</h2>
                    <p>Choose the best program for your career goals</p>
                  </div>
                  <div class="m-course-grid">
                    <div class="m-course">
                      <div class="m-course-img" style="background-image: url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=200')"></div>
                      <div class="m-course-info">
                        <h4>IIT-JEE Advanced</h4>
                        <p>Comprehensive 2-year classroom program.</p>
                        <div class="m-btn-small">View Details</div>
                      </div>
                    </div>
                    <div class="m-course">
                      <div class="m-course-img" style="background-image: url('https://images.unsplash.com/photo-1532187875605-1ef6c237dd1d?auto=format&fit=crop&w=200')"></div>
                      <div class="m-course-info">
                        <h4>NEET Medical</h4>
                        <p>Intensive medical entrance preparation.</p>
                        <div class="m-btn-small">View Details</div>
                      </div>
                    </div>
                    <div class="m-course">
                      <div class="m-course-img" style="background-image: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=200')"></div>
                      <div class="m-course-info">
                        <h4>Foundation (9th-10th)</h4>
                        <p>Building strong concepts for future exams.</p>
                        <div class="m-btn-small">View Details</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Results Screen -->
                <div *ngIf="activeScreen() === 'results'" class="screen-results">
                  <div class="results-portal-card">
                    <div class="portal-header">
                      <mat-icon>emoji_events</mat-icon>
                      <h2>Online Result Portal</h2>
                      <p>Enter your details to view your scorecard</p>
                    </div>
                    <div class="mock-form">
                      <div class="m-field">
                        <label>Test Code</label>
                        <input type="text" placeholder="e.g. JEE-MAIN-402" readonly />
                      </div>
                      <div class="m-field">
                        <label>Roll Number</label>
                        <input type="text" placeholder="Enter your roll no." readonly />
                      </div>
                      <div class="m-field">
                        <label>Date of Birth</label>
                        <input type="date" readonly />
                      </div>
                      <button class="m-submit-btn">Show Result</button>
                    </div>
                    <div class="portal-footer">
                      <p>Need help? Contact your center administrator.</p>
                    </div>
                  </div>
                </div>

                <!-- Contact Screen -->
                <div *ngIf="activeScreen() === 'contact'" class="screen-contact">
                  <div class="mock-section-header">
                    <h2>Contact Us</h2>
                    <p>Get in touch with our support team</p>
                  </div>
                  <div class="contact-mock-grid">
                    <div class="c-item"><mat-icon>mail</mat-icon> support@omrdesk.com</div>
                    <div class="c-item"><mat-icon>phone</mat-icon> +91 98765 43210</div>
                    <div class="c-item"><mat-icon>location_on</mat-icon> Education Hub, New Delhi</div>
                  </div>
                </div>

              </div>

              <!-- Mock Website Footer -->
              <div class="mock-footer">
                <div class="f-logo"><mat-icon>business</mat-icon> {{data.name}}</div>
                <div class="f-links">Privacy Policy | Terms of Service</div>
                <p>© 2024 {{data.name}}. Powered by OMRDesk.</p>
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
        
        .mock-logo { display: flex; align-items: center; gap: 0.5rem; font-weight: 800; color: var(--primary); mat-icon { font-size: 24px; } cursor: pointer; }
        .mock-nav { 
          display: flex; gap: 1.5rem; font-size: 0.8rem; font-weight: 600; color: #475569; 
          span { cursor: pointer; transition: color 0.2s; position: relative; padding: 4px 0; }
          span:hover { color: var(--primary); }
          span.active { color: var(--primary); }
          span.active::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: var(--primary); }
        }
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

      .mock-about-brief { padding: 4rem 2rem; text-align: center; background: white; h2 { font-weight: 800; margin-bottom: 1.5rem; } p { max-width: 750px; margin: 0 auto; color: #475569; line-height: 1.8; font-size: 1rem; } }

      .mock-features-grid {
        display: grid; grid-template-cols: repeat(4, 1fr); gap: 1.5rem; padding: 2rem; background: #f8fafc;
        .m-feat { text-align: center; padding: 1.5rem; background: white; border-radius: 16px; border: 1px solid #e2e8f0; mat-icon { color: var(--primary); margin-bottom: 0.5rem; } h4 { margin: 0 0 0.5rem; font-weight: 700; } p { font-size: 0.75rem; color: #64748b; margin: 0; } }
      }

      .mock-testimonials {
        padding: 4rem 2rem; background: white; text-align: center;
        h2 { font-weight: 800; margin-bottom: 3rem; }
        .t-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 2rem; }
        .t-card { text-align: left; padding: 2rem; background: #f1f5f9; border-radius: 20px; position: relative; p { font-style: italic; color: #334155; margin-bottom: 1.5rem; line-height: 1.6; } }
        .t-user { display: flex; align-items: center; gap: 1rem; }
        .t-avatar { width: 40px; height: 40px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; }
        .t-info { display: flex; flex-direction: column; strong { font-size: 0.9rem; } span { font-size: 0.75rem; color: #64748b; } }
      }

      .mock-news {
        padding: 2rem; background: #f8fafc; border-top: 1px solid #e2e8f0;
        .n-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; span { background: var(--primary); color: white; padding: 4px 12px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; } .n-line { flex: 1; height: 1px; background: #e2e8f0; } }
        .n-list { list-style: none; padding: 0; margin: 0; li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #475569; margin-bottom: 0.5rem; mat-icon { font-size: 18px; width: 18px; height: 18px; color: var(--primary); } } }
      }

      .mock-section-header { padding: 4rem 2rem 1rem; text-align: center; h2 { font-weight: 800; margin: 0; font-size: 2rem; } p { color: #64748b; margin-top: 0.75rem; font-size: 1.1rem; } }

      .mock-courses {
        padding: 1rem 2rem 4rem;
        .m-course-grid { display: grid; grid-template-cols: repeat(3, 1fr); gap: 1.5rem; }
        .m-course { background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; transition: transform 0.2s; cursor: pointer; }
        .m-course:hover { transform: translateY(-4px); }
        .m-course-img { height: 120px; background-size: cover; background-position: center; }
        .m-course-info { padding: 1.25rem; h4 { margin: 0 0 0.5rem; font-weight: 700; } p { font-size: 0.8rem; color: #64748b; margin-bottom: 1rem; } }
        .m-btn-small { font-size: 0.75rem; font-weight: 700; color: var(--primary); }
      }

      .screen-results {
        padding: 4rem 2rem;
        background: #f1f5f9;
        display: flex; justify-content: center;
      }
      .results-portal-card {
        background: white; padding: 2.5rem; border-radius: 20px; width: 100%; max-width: 400px;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        text-align: center;
        
        .portal-header { margin-bottom: 2rem; mat-icon { font-size: 40px; width: 40px; height: 40px; color: #d97706; margin-bottom: 0.5rem; } h2 { margin: 0; font-weight: 800; } p { font-size: 0.85rem; color: #64748b; } }
      }
      .mock-form {
        text-align: left;
        .m-field { margin-bottom: 1.25rem; label { display: block; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 0.4rem; text-transform: uppercase; } input { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; font-size: 0.9rem; } }
        .m-submit-btn { width: 100%; padding: 0.8rem; background: var(--primary); color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 0.5rem; }
      }
      .portal-footer { margin-top: 2rem; font-size: 0.75rem; color: #94a3b8; }

      .screen-contact {
        padding-bottom: 4rem;
        .contact-mock-grid { display: grid; grid-template-cols: repeat(3, 1fr); gap: 2rem; padding: 0 2rem; text-align: center; }
        .c-item { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; font-weight: 600; color: #475569; font-size: 0.85rem; mat-icon { color: var(--primary); } }
      }

      .mock-footer {
        padding: 3rem 2rem;
        background: #1e293b;
        color: white;
        text-align: center;
        .f-logo { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 700; margin-bottom: 1rem; mat-icon { font-size: 20px; } }
        .f-links { font-size: 0.75rem; opacity: 0.5; margin-bottom: 1rem; }
        p { font-size: 0.7rem; opacity: 0.4; margin: 0; }
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
  activeScreen = signal('home');

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  setScreen(screen: string): void {
    this.activeScreen.set(screen);
  }
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
