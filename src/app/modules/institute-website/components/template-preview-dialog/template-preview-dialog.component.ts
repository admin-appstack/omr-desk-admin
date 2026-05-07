import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// --- Data shapes for each template ---
export interface TemplatePreviewData {
  id: number;
  name: string;
  primaryColor: string;
  tags: string[];
}

@Component({
  selector: 'app-template-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './template-preview-dialog.component.html',
  styleUrls: ['./template-preview-dialog.component.scss']
})
export class TemplatePreviewDialog {
  activeScreen = signal('home');

  // ---------- Template 1: Modern Academy ----------
  modernCourses = [
    { name: 'IIT-JEE Advanced', desc: 'Comprehensive 2-year classroom program for Class 11-12.', duration: '2 Years', level: 'Advanced', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=300' },
    { name: 'NEET Medical', desc: 'Intensive medical entrance preparation for future doctors.', duration: '1 Year', level: 'Professional', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300' },
    { name: 'Foundation Program', desc: 'Building strong concepts for Class 9th & 10th students.', duration: '2 Years', level: 'Basic', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300' },
    { name: 'JEE Main Crash Course', desc: 'Fast-track revision and mock tests for JEE Main.', duration: '3 Months', level: 'Fast-track', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300' },
  ];

  modernTestimonials = [
    { quote: 'The OMR analysis helped me identify weak topics in Physics. Instant results are amazing!', name: 'Ankit Aryan', rank: 'AIR 45, JEE 2024', initials: 'AA' },
    { quote: 'Easy to use portal. I can check my rank and detailed scorecard right from my phone.', name: 'Sneha Reddy', rank: 'AIR 112, NEET 2024', initials: 'SR' },
  ];

  modernStats = [
    { value: '15+', label: 'Years Excellence' },
    { value: '2500+', label: 'Selections' },
    { value: '50+', label: 'Top Centers' },
  ];

  modernFeatures = [
    { icon: 'psychology', title: 'AI Analysis', desc: 'Detailed performance breakdown using AI.' },
    { icon: 'speed', title: 'Instant Results', desc: 'Get your OMR results within minutes.' },
    { icon: 'trending_up', title: 'Rank Ticker', desc: 'Live state-wide and center-wide ranking.' },
    { icon: 'devices', title: 'Hybrid Learning', desc: 'Access tests from any device, anywhere.' },
  ];

  modernNews = [
    'Registration open for Scholarship Test 2024',
    'New Batch starting for JEE Advanced from June 15th',
    'NEET UG counselling guidance sessions every Saturday',
  ];

  // ---------- Template 2: Classic Institute ----------
  classicNavLinks = ['Home', 'About', 'Results', 'Faculty', 'Events', 'Contact'];

  classicResults = [
    { name: 'Rahul Sharma', exam: 'JEE Advanced 2024', rank: 'AIR 12', score: '312/360' },
    { name: 'Priya Nair', exam: 'NEET 2024', rank: 'AIR 34', score: '710/720' },
    { name: 'Amit Kumar', exam: 'JEE Main 2024', rank: 'AIR 67', score: '99.8%ile' },
    { name: 'Divya Mehta', exam: 'NEET 2024', rank: 'AIR 89', score: '705/720' },
    { name: 'Suresh Pillai', exam: 'JEE Advanced 2024', rank: 'AIR 145', score: '289/360' },
  ];

  classicFaculty = [
    { name: 'Dr. R. K. Sharma', subject: 'Physics', exp: '22 Yrs', initials: 'RS' },
    { name: 'Prof. A. Gupta', subject: 'Chemistry', exp: '18 Yrs', initials: 'AG' },
    { name: 'Dr. N. Mishra', subject: 'Mathematics', exp: '25 Yrs', initials: 'NM' },
    { name: 'Dr. S. Verma', subject: 'Biology', exp: '15 Yrs', initials: 'SV' },
  ];

  classicEvents = [
    { date: '15 Jun', title: 'JEE Advanced New Batch', type: 'Batch' },
    { date: '22 Jun', title: 'Scholarship Test 2024', type: 'Exam' },
    { date: '01 Jul', title: 'NEET Special Crash Course', type: 'Course' },
    { date: '10 Jul', title: 'Annual Science Olympiad', type: 'Event' },
  ];

  classicDownloads = [
    { title: 'JEE 2024 Syllabus PDF', icon: 'picture_as_pdf' },
    { title: 'NEET 2024 Sample Papers', icon: 'picture_as_pdf' },
    { title: 'Scholarship Form 2024', icon: 'picture_as_pdf' },
  ];

  // ---------- Template 3: Tech Portal ----------
  techModules = [
    { icon: 'terminal', title: 'Full Stack Dev', desc: 'MERN, Python, Django, REST APIs', badge: 'Trending', students: '1.2k' },
    { icon: 'cloud', title: 'Cloud & DevOps', desc: 'AWS, Docker, Kubernetes, CI/CD', badge: 'New', students: '840' },
    { icon: 'security', title: 'Cybersecurity', desc: 'Ethical Hacking, CEH Prep, Pen Testing', badge: 'Hot', students: '670' },
    { icon: 'data_object', title: 'Data Science & ML', desc: 'Python, TensorFlow, Pandas, Tableau', badge: 'Popular', students: '980' },
  ];

  techWebinars = [
    { title: 'Intro to LLMs & Prompt Engineering', date: 'Jun 14, 2024 — 6:00 PM', seats: '120 seats left', live: true },
    { title: 'System Design for Interviews', date: 'Jun 21, 2024 — 7:00 PM', seats: '85 seats left', live: false },
    { title: 'AWS Solutions Architect Prep', date: 'Jun 28, 2024 — 5:00 PM', seats: '200 seats left', live: false },
  ];

  techCodeSnippet = `// Live OMR scan result via API
fetch('/api/results?roll=CS2024042')
  .then(res => res.json())
  .then(data => {
    console.log('Score:', data.score);
    console.log('Rank:', data.rank);
  });`;

  techStats = [
    { value: '10k+', label: 'Students Trained', icon: 'group' },
    { value: '98%', label: 'Placement Rate', icon: 'work' },
    { value: '50+', label: 'Live Projects', icon: 'rocket_launch' },
    { value: '4.9★', label: 'Google Rating', icon: 'star' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TemplatePreviewData,
    public dialogRef: MatDialogRef<TemplatePreviewDialog>
  ) {}

  setScreen(screen: string): void {
    this.activeScreen.set(screen);
  }

  selectTemplate(): void {
    this.dialogRef.close(true);
  }

  getSlug(): string {
    return this.data.name.toLowerCase().replace(/\s+/g, '-');
  }
}
