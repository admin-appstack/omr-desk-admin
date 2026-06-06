import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from '../../common/services/snackbar.service';

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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loading = signal(false);
  showPassword = signal(false);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBarService: SnackBarService
  ) {}

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBarService.showWarning('All fields are required and password must be at least 6 characters.');
      return;
    }

    this.loading.set(true);

    this.authService.register(this.form.value as { name: string; email: string; password: string })
      .then(() => {
        this.snackBarService.showSuccess('Registered successfully!');
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        this.snackBarService.showError(err.message || 'Registration failed.');
      })
      .finally(() => this.loading.set(false));
  }
}

