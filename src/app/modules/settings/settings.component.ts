import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  activeTab = 0;
  saved = false;

  tabs = [
    { label: 'Account Profile', sub: 'Name, email & photo',       icon: 'fa-thin fa-manage-accounts' },
    { label: 'Notifications',   sub: 'Alerts & auto-publish',      icon: 'fa-thin fa-notifications'   },
    { label: 'Security',        sub: 'Password & sessions',        icon: 'fa-thin fa-shield-halved'        },
    { label: 'Appearance',      sub: 'Theme & language',           icon: 'fa-thin fa-palette'         },
  ];

  profile = {
    name:      'Administrator',
    email:     'admin@omrdesk.com',
    phone:     '+91 98765 43210',
    institute: 'OMRDesk Institute',
    tagline:   'Excellence in Education',
  };

  notifItems = [
    {
      label:   'Email Alerts',
      desc:    'Receive weekly performance reports via email.',
      icon: 'fa-thin fa-envelope',
      bg:      '#eff6ff',
      color:   '#1d4ed8',
      enabled: true,
    },
    {
      label:   'SMS Alerts',
      desc:    'Notify students via SMS when results are published.',
      icon: 'fa-thin fa-sms',
      bg:      '#f0fdf4',
      color:   '#15803d',
      enabled: false,
    },
    {
      label:   'Auto-Publish Results',
      desc:    'Automatically publish results after OMR scan completion.',
      icon: 'fa-thin fa-upload',
      bg:      '#fff7ed',
      color:   '#c2410c',
      enabled: true,
    },
    {
      label:   'Low Credit Warning',
      desc:    'Alert me when available scan credits fall below 500.',
      icon: 'fa-thin fa-warning-amber',
      bg:      '#fefce8',
      color:   '#a16207',
      enabled: true,
    },
  ];

  sessions = [
    { device: 'Chrome on Windows 11', location: 'Mumbai, IN', time: 'Now',        icon: 'fa-thin fa-desktop',  current: true  },
    { device: 'Safari on iPhone 15',  location: 'Pune, IN',   time: '2h ago',     icon: 'fa-thin fa-phone-iphone', current: false },
    { device: 'Firefox on Mac',       location: 'Delhi, IN',  time: 'Yesterday',  icon: 'fa-thin fa-laptop-mac',   current: false },
  ];

  themes = [
    { label: 'Light',  value: 'light',  preview: 'linear-gradient(135deg, #f8fafc, #e2e8f0)' },
    { label: 'Dark',   value: 'dark',   preview: 'linear-gradient(135deg, #1e293b, #0f172a)'  },
    { label: 'Purple', value: 'purple', preview: 'linear-gradient(135deg, #ede9fe, #7c3aed)'  },
  ];

  selectedTheme = 'light';
  language  = 'en';
  timezone  = 'IST';
}
