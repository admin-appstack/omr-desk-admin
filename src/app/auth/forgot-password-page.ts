import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'forgot-password-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="auth-card">
      <h1>Forgot Password</h1>
      <p>Enter the email address associated with your account to receive reset instructions.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label>
          Email
          <input type="email" formControlName="email" placeholder="you@example.com" />
        </label>

        <button type="submit" [disabled]="form.invalid || loading()">Send reset link</button>

        <p class="success" *ngIf="success()">{{ success() }}</p>
        <p class="error" *ngIf="error()">{{ error() }}</p>
      </form>
    </section>
  `,
  styleUrls: ['./auth-page.scss']
})
export class ForgotPasswordPage {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  error = signal('');
  success = signal('');
  loading = signal(false);

  constructor(private readonly authService: AuthService) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.error.set('A valid email is required.');
      this.success.set('');
      return;
    }

    this.error.set('');
    this.success.set('');
    this.loading.set(true);

    const email = this.form.value.email ?? '';
    this.authService.forgotPassword(email)
      .then(() => this.success.set('If that email exists, reset instructions have been sent.'))
      .catch((err) => this.error.set(err.message))
      .finally(() => this.loading.set(false));
  }
}
