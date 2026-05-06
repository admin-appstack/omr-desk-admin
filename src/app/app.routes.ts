import { Routes } from '@angular/router';
import { DashboardPage } from './dashboard-page';
import { ForgotPasswordPage } from './auth/forgot-password-page';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordPage },
  { path: 'dashboard', component: DashboardPage },
  { path: '**', redirectTo: 'login' }
];
