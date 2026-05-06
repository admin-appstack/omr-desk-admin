import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-page-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss']
})
export class PageManagementComponent {
  pages = [
    { name: 'Home Page', icon: 'home' },
    { name: 'About Us', icon: 'info' },
    { name: 'Courses', icon: 'school' },
    { name: 'Contact Us', icon: 'contact_page' },
    { name: 'Test Series', icon: 'assignment' },
    { name: 'Recent Results', icon: 'emoji_events' },
  ];
}
