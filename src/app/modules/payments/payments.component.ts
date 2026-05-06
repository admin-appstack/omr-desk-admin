import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  displayedColumns = ['id', 'date', 'description', 'amount', 'method', 'status', 'actions'];

  statCards = [
    { label: 'Total Revenue',   value: '₹84,200',       icon: 'account_balance_wallet', theme: 'revenue', tag: '+12% vs last month', tagClass: 'up'   },
    { label: 'Available Credits', value: '4,500',        icon: 'toll',                  theme: 'credits', tag: '450 used this week',  tagClass: 'info' },
    { label: 'Active Plan',     value: 'Enterprise Plus', icon: 'workspace_premium',     theme: 'plan',    tag: 'Renews Jul 2024',     tagClass: 'plan' },
    { label: 'Invoices',        value: '24',             icon: 'receipt_long',           theme: 'invoices',tag: '3 due this month',    tagClass: 'info' },
  ];

  planFeatures = [
    'Unlimited OMR Scans',
    'Advanced Analytics',
    'Priority Support',
    'Custom Branding',
    'Multi-Admin Access',
    'API Integration',
  ];

  quickActions = [
    { label: 'Download Invoice',  icon: 'download',       bg: '#eff6ff', color: '#1d4ed8' },
    { label: 'Add Credits',       icon: 'add_card',       bg: '#dcfce7', color: '#15803d' },
    { label: 'Upgrade Plan',      icon: 'rocket_launch',  bg: '#ede9fe', color: '#7c3aed' },
    { label: 'Payment History',   icon: 'history',        bg: '#fff7ed', color: '#c2410c' },
  ];

  transactions = [
    { id: 'TXN-9021', date: '2024-05-01', description: 'Enterprise Plan – May',  amount: 12500, method: 'UPI',           methodIcon: 'phone_iphone',  status: 'Completed' },
    { id: 'TXN-9022', date: '2024-05-03', description: 'Credit Top-up (500)',    amount: 8400,  method: 'Credit Card',   methodIcon: 'credit_card',   status: 'Completed' },
    { id: 'TXN-9023', date: '2024-05-05', description: 'API Add-on Module',      amount: 32000, method: 'Bank Transfer', methodIcon: 'account_balance', status: 'Pending' },
    { id: 'TXN-9024', date: '2024-05-08', description: 'Additional Admin Seats', amount: 5000,  method: 'UPI',           methodIcon: 'phone_iphone',  status: 'Completed' },
  ];
}
