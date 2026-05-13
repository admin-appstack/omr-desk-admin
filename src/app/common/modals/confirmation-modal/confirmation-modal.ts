import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="modal-overlay" (click)="cancel.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" (click)="cancel.emit()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        <div class="modal-body">
          <div class="icon-warning">
            <mat-icon>warning</mat-icon>
          </div>
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button mat-stroked-button (click)="cancel.emit()">Cancel</button>
          <button mat-flat-button color="warn" (click)="confirm.emit()">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      width: 450px;
      max-width: 90%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      animation: modalSlideUp 0.3s ease-out;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      
      h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 700;
        color: #0f172a;
      }
      
      .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #94a3b8;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        border-radius: 50%;
        &:hover {
          background: #f1f5f9;
          color: #475569;
        }
      }
    }
    .modal-body {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      
      .icon-warning {
        width: 48px;
        height: 48px;
        background: #fee2e2;
        color: #ef4444;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        
        mat-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
        }
      }
      
      p {
        margin: 0;
        color: #475569;
        font-size: 1rem;
        line-height: 1.5;
        flex: 1;
      }
    }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      
      button {
        border-radius: 8px;
        font-weight: 600;
        padding: 0 1.5rem;
        height: 40px;
      }
    }
    @keyframes modalSlideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ConfirmationModalComponent {
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
