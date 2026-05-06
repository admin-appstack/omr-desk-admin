import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="auth-page-container">
      <!-- Left Side: Welcome Panel -->
      <div class="welcome-panel">
        <div class="floating-bubbles">
          <div class="bubble" style="width: 80px; height: 80px; left: 10%; animation-delay: 0s;"></div>
          <div class="bubble" style="width: 40px; height: 40px; left: 30%; animation-delay: -5s;"></div>
          <div class="bubble" style="width: 120px; height: 120px; left: 70%; animation-delay: -10s;"></div>
          <div class="bubble" style="width: 60px; height: 60px; left: 50%; animation-delay: -15s;"></div>
          <div class="bubble" style="width: 90px; height: 90px; left: 90%; animation-delay: -2s;"></div>
        </div>

        <div class="welcome-content">
          <p class="text-xl font-medium opacity-90 mb-8">Welcome to</p>
          <div class="brand-logo-container">
            <div class="logo-circle">
              <img src="ORMDesk_Logo.png" alt="OMRDesk Logo" />
            </div>
          </div>
          
          <p class="welcome-text">
            Join hundreds of institutes using OMRDesk to automate their test management lifecycle.
          </p>

          <div class="panel-footer">
            <span>CREATOR: APPSTACK</span>
            <span class="separator-dot">|</span>
            <span>DESIGNER: ANTIGRAVITY</span>
          </div>
        </div>
      </div>

      <!-- Right Side: Form Panel -->
      <div class="form-panel">
        <div class="form-container">
          <h3 class="form-title">Create account</h3>
          
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput type="text" formControlName="name" placeholder="John Doe" />
              <mat-icon matSuffix *ngIf="form.get('name')?.valid">person</mat-icon>
              <mat-error *ngIf="form.get('name')?.hasError('minlength')">
                Name must be at least 2 characters.
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email Address</mat-label>
              <input matInput type="email" formControlName="email" placeholder="you@example.com" />
              <mat-icon matSuffix *ngIf="form.get('email')?.valid">alternate_email</mat-icon>
              <mat-error *ngIf="form.get('email')?.hasError('email')">
                Please enter a valid email.
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [type]="showPassword() ? 'text' : 'password'" formControlName="password" placeholder="••••••••" />
              <button mat-icon-button matSuffix (click)="togglePassword()" type="button">
                <mat-icon>{{ showPassword() ? 'visibility' : 'visibility_off' }}</mat-icon>
              </button>
              <mat-error *ngIf="form.get('password')?.hasError('minlength')">
                Password must be at least 6 characters.
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="form.invalid || loading()"
            >
              {{ loading() ? 'Creating account...' : 'Create account' }}
            </button>

            <div *ngIf="error()" class="error-message">
              {{ error() }}
            </div>
          </form>

          <div class="divider-box">
            <div class="line"></div>
            <span>Policy</span>
            <div class="line"></div>
          </div>
          
          <p class="text-xs text-slate-500 text-center mb-6">
            By signing up, you agree to our <a href="#" class="text-indigo-600 font-semibold">Terms & Conditions</a>.
          </p>

          <div class="auth-footer">
            <a routerLink="/login">Already have an account?</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './auth-page.scss'
})
export class RegisterPage {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  error = signal('');
  loading = signal(false);
  showPassword = signal(false);

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.error.set('All fields are required and password must be at least 6 characters.');
      return;
    }

    this.error.set('');
    this.loading.set(true);

    this.authService.register(this.form.value as { name: string; email: string; password: string })
      .then(() => this.router.navigate(['/dashboard']))
      .catch((err) => this.error.set(err.message))
      .finally(() => this.loading.set(false));
  }
}

