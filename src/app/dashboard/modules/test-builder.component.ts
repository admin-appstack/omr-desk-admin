import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'test-builder',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTabsModule],
  template: `
    <div class="module-container">
      <div class="module-header">
        <div>
          <h1>Test Builder</h1>
          <p>Configure exam parameters, marking schemes, and generate OMR/Online tests.</p>
        </div>
        <div class="header-actions">
          <button mat-stroked-button color="primary">
            <mat-icon>file_download</mat-icon>
            Template Gallery
          </button>
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            Create New Test
          </button>
        </div>
      </div>

      <mat-tab-group class="test-tabs">
        <mat-tab label="Recent Tests">
          <div class="tab-content">
            <div class="test-grid">
              <mat-card *ngFor="let test of tests" class="test-card">
                <div class="test-card-header">
                  <span class="test-type" [class]="test.type.toLowerCase()">{{test.type}}</span>
                  <button mat-icon-button><mat-icon>more_vert</mat-icon></button>
                </div>
                <h3 class="test-name">{{test.name}}</h3>
                <div class="test-meta">
                  <div class="meta-item">
                    <mat-icon>schedule</mat-icon>
                    <span>{{test.duration}} mins</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>question_answer</mat-icon>
                    <span>{{test.questions}} Qs</span>
                  </div>
                </div>
                <div class="test-card-footer">
                  <button mat-button color="primary">Edit Configuration</button>
                  <button mat-icon-button color="accent" title="Generate OMR"><mat-icon>description</mat-icon></button>
                </div>
              </mat-card>
            </div>
          </div>
        </mat-tab>
        <mat-tab label="Templates">
          <div class="tab-content empty">
             <mat-icon>auto_awesome</mat-icon>
             <p>Select a template to quickly bootstrap your exam configuration.</p>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .module-container { display: flex; flex-direction: column; gap: 2rem; }
    .module-header { display: flex; justify-content: space-between; align-items: center; }
    .header-actions { display: flex; gap: 1rem; }
    
    .test-grid { 
      display: grid; 
      grid-template-cols: repeat(auto-fill, minmax(300px, 1fr)); 
      gap: 1.5rem; 
      padding-top: 1.5rem;
    }
    
    .test-card { padding: 1.5rem; border-radius: 16px; transition: all 0.2s ease; }
    .test-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px -10px rgba(0,0,0,0.1); }
    
    .test-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .test-type { 
      font-size: 0.7rem; 
      font-weight: 800; 
      text-transform: uppercase; 
      padding: 4px 10px; 
      border-radius: 4px; 
    }
    .test-type.omr { background: #fee2e2; color: #991b1b; }
    .test-type.online { background: #dcfce7; color: #166534; }
    
    .test-name { font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem; }
    
    .test-meta { display: flex; gap: 1.5rem; color: #64748b; margin-bottom: 1.5rem; }
    .meta-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 500; }
    .meta-item mat-icon { font-size: 18px; width: 18px; height: 18px; }
    
    .test-card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 1rem; }
    
    .tab-content.empty { padding: 5rem; text-align: center; color: #94a3b8; }
    .tab-content.empty mat-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 1rem; }
  `]
})
export class TestBuilderComponent {
  tests = [
    { name: 'Unit Test - Calculus', type: 'OMR', duration: 60, questions: 30 },
    { name: 'Half Yearly Physics', type: 'Online', duration: 180, questions: 90 },
    { name: 'Mock JEE Main #4', type: 'OMR', duration: 180, questions: 75 },
    { name: 'Biology Quiz - Cells', type: 'Online', duration: 20, questions: 20 },
  ];
}
