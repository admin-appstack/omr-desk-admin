import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService, SocialProvider } from './auth.service';

@Component({
  selector: 'login-page',
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
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-slate-100 px-4">
      <mat-card class="w-full max-w-md shadow-2xl">
        <mat-card-header class="mb-4">
          <mat-card-title class="text-3xl font-bold text-slate-900">Login</mat-card-title>
          <mat-card-subtitle class="text-slate-600 mt-2">
            Access your admin account with email or a social provider.
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="you@example.com" />
              <mat-error *ngIf="form.get('email')?.hasError('email')">
                Please enter a valid email.
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" placeholder="••••••••" />
              <mat-error *ngIf="form.get('password')?.hasError('minlength')">
                Password must be at least 6 characters.
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="form.invalid || loading()"
              class="w-full"
            >
              {{ loading() ? 'Signing in...' : 'Sign in' }}
            </button>

            <div *ngIf="error()" class="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
              {{ error() }}
            </div>
          </form>

          <div class="my-6 flex items-center gap-3">
            <div class="flex-1 h-px bg-slate-300"></div>
            <span class="text-slate-600 text-sm">Or continue with</span>
            <div class="flex-1 h-px bg-slate-300"></div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <button
              mat-stroked-button
              (click)="loginWith('google')"
              [disabled]="loading()"
              class="text-indigo-900"
            >
              Google
            </button>
            <button
              mat-stroked-button
              (click)="loginWith('facebook')"
              [disabled]="loading()"
              class="text-blue-700"
            >
              Facebook
            </button>
            <button
              mat-stroked-button
              (click)="loginWith('instagram')"
              [disabled]="loading()"
              class="text-fuchsia-600"
            >
              Instagram
            </button>
          </div>
        </mat-card-content>

        <mat-card-footer class="mt-6 pt-6 border-t border-slate-200 flex justify-between">
          <a routerLink="/register" class="text-blue-600 hover:underline text-sm font-medium">
            Create account
          </a>
          <a routerLink="/forgot-password" class="text-blue-600 hover:underline text-sm font-medium">
            Forgot password?
          </a>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: [`
    ::ng-deep {
      .mat-mdc-card {
        border-radius: 1.5rem;
      }
      .mat-mdc-form-field {
        width: 100%;
      }
    }
  `]
})
export class LoginPage {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  error = signal('');
  loading = signal(false);

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.error.set('Please fill in valid credentials.');
      return;
    }

    this.error.set('');
    this.loading.set(true);

    this.authService.login(this.form.value as { email: string; password: string })
      .then(() => this.router.navigate(['/dashboard']))
      .catch((err) => this.error.set(err.message))
      .finally(() => this.loading.set(false));
  }

  loginWith(provider: SocialProvider): void {
    this.error.set('');
    this.loading.set(true);

    this.authService.loginWithProvider(provider)
      .then(() => this.router.navigate(['/dashboard']))
      .finally(() => this.loading.set(false));
  }
}

