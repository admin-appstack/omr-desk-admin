import { Routes } from '@angular/router';
import { ForgotPasswordPage } from './auth/forgot-password-page';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home.component';
import { OmrScanningComponent } from './dashboard/modules/omr-scanning.component';
import { QuestionBankComponent } from './dashboard/modules/question-bank.component';
import { TestBuilderComponent } from './dashboard/modules/test-builder.component';
import { ResultAnalyticsComponent } from './dashboard/modules/result-analytics.component';
import { InstituteWebsiteComponent } from './dashboard/modules/institute-website.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordPage },
  { 
    path: 'dashboard', 
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
      { path: 'home', component: DashboardHomeComponent },
      { path: 'scanning', component: OmrScanningComponent },
      { path: 'questions', component: QuestionBankComponent },
      { path: 'tests', component: TestBuilderComponent },
      { path: 'results', component: ResultAnalyticsComponent },
      { path: 'website', component: InstituteWebsiteComponent },
      { path: 'payments', component: DashboardHomeComponent }, // Placeholder
      { path: 'settings', component: DashboardHomeComponent }, // Placeholder
    ]
  },
  { path: '**', redirectTo: 'login' }
];
