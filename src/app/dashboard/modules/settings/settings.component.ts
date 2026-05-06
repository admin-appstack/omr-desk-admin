import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  profile = {
    name: 'Administrator',
    email: 'admin@omrdesk.com',
    phone: '+91 98765 43210'
  };

  notifications = {
    emailAlerts: true,
    smsAlerts: false,
    autoPublish: true
  };
}
