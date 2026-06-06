import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.scss']
})
export class SubscriptionManagementComponent {
  displayedColumns = ['id', 'date', 'description', 'amount', 'method', 'status', 'actions'];

  currentPlan = {
    name: 'Premium Plan',
    price: '$150/mo',
    billingCycle: 'Monthly',
    nextBilling: 'June 12, 2026',
    status: 'Active',
    daysRemaining: 31,
    usage: [
      { label: 'OMR Scans', icon: 'fa-thin fa-qrcode', current: 750, limit: 1000, color: '#6366f1', percent: 75 },
      { label: 'Question Bank', icon: 'fa-thin fa-book-open-reader', current: 2400, limit: 5000, color: '#10b981', percent: 48 },
      { label: 'Test Builder', icon: 'fa-thin fa-file-lines', current: 45, limit: 100, color: '#f59e0b', percent: 45 }
    ]
  };

  plans = [
    {
      name: 'Free',
      icon: 'fa-thin fa-free-breakfast',
      price: '0',
      period: 'forever',
      description: 'Perfect for getting started',
      color: '#64748b',
      features: [
        { text: '20 Scans/month', available: true },
        { text: 'Basic Analytics', available: true },
        { text: 'Standard Support', available: true },
        { text: 'API Access', available: false },
        { text: 'White-labeling', available: false }
      ],
      recommended: false,
      current: false
    },
    {
      name: 'Pro',
      icon: 'fa-thin fa-bolt',
      price: '80',
      period: 'per month',
      description: 'Great for growing institutes',
      color: '#3b82f6',
      features: [
        { text: '500 Scans/month', available: true },
        { text: 'Advanced Analytics', available: true },
        { text: 'Priority Support', available: true },
        { text: 'Custom Reports', available: true },
        { text: 'White-labeling', available: false }
      ],
      recommended: false,
      current: false
    },
    {
      name: 'Premium',
      icon: 'fa-thin fa-workspace-premium',
      price: '150',
      period: 'per month',
      description: 'Best for established institutions',
      color: '#6366f1',
      features: [
        { text: '1000 Scans/month', available: true },
        { text: 'Real-time Analytics', available: true },
        { text: '24/7 Support', available: true },
        { text: 'API Access', available: true },
        { text: 'White-labeling', available: true }
      ],
      recommended: true,
      current: true
    },
    {
      name: 'Platinum',
      icon: 'fa-thin fa-diamond',
      price: '450',
      period: 'per month',
      description: 'For enterprise-scale operations',
      color: '#f59e0b',
      features: [
        { text: 'Unlimited Scans', available: true },
        { text: 'AI-driven Insights', available: true },
        { text: 'Dedicated Manager', available: true },
        { text: 'Custom Integrations', available: true },
        { text: 'SLA Guarantee', available: true }
      ],
      recommended: false,
      current: false
    }
  ];

  transactions = [
    { id: 'INV-4821', date: 'May 12, 2026', description: 'Premium Plan – May', amount: '$150.00', method: 'Visa •••• 4242', status: 'Paid' },
    { id: 'INV-3910', date: 'Apr 12, 2026', description: 'Premium Plan – Apr', amount: '$150.00', method: 'Visa •••• 4242', status: 'Paid' },
    { id: 'INV-2105', date: 'Mar 12, 2026', description: 'Premium Plan – Mar', amount: '$150.00', method: 'Visa •••• 4242', status: 'Paid' },
    { id: 'INV-1054', date: 'Feb 12, 2026', description: 'Premium Plan – Feb', amount: '$150.00', method: 'Visa •••• 4242', status: 'Paid' },
  ];

  quickStats = [
    { label: 'Total Spent', value: '$600.00', icon: 'fa-thin fa-account-balance-wallet', sub: 'This year', color: '#6366f1', bg: '#f5f3ff' },
    { label: 'Invoices', value: '4', icon: 'fa-thin fa-receipt-long', sub: '0 outstanding', color: '#10b981', bg: '#f0fdf4' },
    { label: 'Days Left', value: '31', icon: 'fa-thin fa-calendar-day', sub: 'Until renewal', color: '#f59e0b', bg: '#fffbeb' },
  ];
}
