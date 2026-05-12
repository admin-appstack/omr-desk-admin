import { Routes } from '@angular/router';
import { ForgotPasswordPage } from './auth/forgot-password-page';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardLayoutComponent } from './modules/dashboard/dashboard-layout.component';
import { DashboardHomeComponent } from './modules/dashboard/dashboard-home.component';
import { OmrScanningComponent } from './modules/omr-scanning/omr-scanning.component';
import { QuestionBankComponent } from './modules/question-bank/question-bank.component';
import { TestBuilderComponent } from './modules/test-builder/test-builder.component';
import { ResultAnalyticsComponent } from './modules/result-analytics/result-analytics.component';
import { InstituteWebsiteComponent } from './modules/institute-website/institute-website.component';
import { SubscriptionManagementComponent } from './modules/subscription-management/subscription-management.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { UserManagement } from './modules/user-management/user-management';
import { RoleManagement } from './modules/role-management/role-management';
import { StudentManagement } from './modules/student-management/student-management';
import { ExamsComponent } from './modules/exams/exams.component';
import { ClassesComponent } from './modules/classes/classes';

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
      { path: 'exams', component: ExamsComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'scanning', component: OmrScanningComponent },
      { path: 'questions', component: QuestionBankComponent },
      { path: 'tests', component: TestBuilderComponent },
      { path: 'results', component: ResultAnalyticsComponent },
      { path: 'website', component: InstituteWebsiteComponent },
      { path: 'subscriptions', component: SubscriptionManagementComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UserManagement },
      { path: 'roles', component: RoleManagement },
      { path: 'students', component: StudentManagement },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
