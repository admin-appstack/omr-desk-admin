import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit-page-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule],
  templateUrl: './edit-page-dialog.html',
  styleUrl: './edit-page-dialog.scss',
})
export class EditPageDialog {
  pageName = '';
  
  // Home Page Specific Data
  heroTitle = 'Welcome to Our Institute';
  heroSubtitle = 'Empowering students to achieve their dreams with world-class education.';
  aboutParagraph = '';
  primaryButtonText = 'Apply Now';
  primaryButtonLink = '/apply';

  showAnnouncement = true;
  announcementText = 'Admissions open for 2024-2025 batch! Apply now to get early bird discount.';
  
  statsList = [
    { value: '15+', label: 'Years of Excellence' },
    { value: '5000+', label: 'Successful Alumni' },
    { value: '50+', label: 'Expert Faculties' }
  ];

  featuresList = [
    { title: 'Modern Campus', description: 'State of the art facilities and smart classrooms.', icon: 'business' },
    { title: 'Expert Faculty', description: 'Learn from industry professionals.', icon: 'school' }
  ];

  videoTourUrl = 'https://www.youtube.com/watch?v=example';

  testimonialsList = [
    { studentName: 'Sarah Jenkins', course: 'Computer Science', quote: 'This institute changed my life! The faculty is incredibly supportive.', image: null }
  ];

  faqsList = [
    { question: 'What is the admission process?', answer: 'You can apply online through our portal and then appear for an interview.' }
  ];
  
  // About Us Specific Data
  aboutHeading = 'Our Story';
  establishedYear = '';
  aboutMission = '';
  aboutVision = '';
  coreValues = '';
  principalName = '';
  principalMessage = '';
  teamList = [
    { name: 'John Smith', role: 'Head of Mathematics', description: 'With over 20 years of experience, John leads the math department with excellence.', image: null }
  ];

  affiliationsList = [
    { name: 'National Education Board', logo: null }
  ];

  milestonesList = [
    { year: '1995', title: 'Foundation', description: 'The institute was founded with a vision to provide quality education.' }
  ];
  
  // Courses Specific Data
  coursesHeading = 'Explore Our Programs';
  coursesDescription = '';
  admissionProcess = '';
  learningBenefits = '';
  coursesList = [
    { 
      name: 'Mathematics 101', 
      description: 'Fundamental principles of mathematics.', 
      duration: '6 Months',
      mode: 'Offline',
      fees: '₹5000',
      eligibility: 'High School Diploma',
      image: null 
    }
  ];
  
  // Contact Us Specific Data
  contactAddress = '';
  contactPhone = '';
  contactEmail = '';
  contactMapLink = '';
  workingHours = 'Mon-Fri: 9:00 AM - 5:00 PM';
  
  socialFacebook = '';
  socialTwitter = '';
  socialInstagram = '';
  socialLinkedIn = '';
  socialYoutube = '';

  enableContactForm = true;
  contactFormEmail = '';
  
  // Generic Page Content (Fallback)
  pageContent = '';

  constructor(
    public dialogRef: MatDialogRef<EditPageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.pageName = data.name || '';
      if (!['Home Page', 'About Us', 'Courses', 'Contact Us'].includes(this.pageName)) {
        this.pageContent = `<h1>Welcome to the ${this.pageName}</h1>\n<p>This is the placeholder content for this page. Replace it with actual content using the visual builder tools.</p>`;
      }
    }
  }

  triggerUpload() {
    // Mock upload action
    alert('File upload dialog would open here.');
  }

  addCourse() {
    this.coursesList.push({ 
      name: '', 
      description: '', 
      duration: '',
      mode: 'Offline',
      fees: '',
      eligibility: '',
      image: null 
    });
  }

  removeCourse(index: number) {
    this.coursesList.splice(index, 1);
  }

  addTeamMember() {
    this.teamList.push({ name: '', role: '', description: '', image: null });
  }

  removeTeamMember(index: number) {
    this.teamList.splice(index, 1);
  }

  addAffiliation() { this.affiliationsList.push({ name: '', logo: null }); }
  removeAffiliation(index: number) { this.affiliationsList.splice(index, 1); }

  addMilestone() { this.milestonesList.push({ year: '', title: '', description: '' }); }
  removeMilestone(index: number) { this.milestonesList.splice(index, 1); }

  addStat() { this.statsList.push({ value: '', label: '' }); }
  removeStat(index: number) { this.statsList.splice(index, 1); }
  
  addFeature() { this.featuresList.push({ title: '', description: '', icon: '' }); }
  removeFeature(index: number) { this.featuresList.splice(index, 1); }

  addTestimonial() { this.testimonialsList.push({ studentName: '', course: '', quote: '', image: null }); }
  removeTestimonial(index: number) { this.testimonialsList.splice(index, 1); }

  addFaq() { this.faqsList.push({ question: '', answer: '' }); }
  removeFaq(index: number) { this.faqsList.splice(index, 1); }

  close(): void { this.dialogRef.close(); }
  save(): void { this.dialogRef.close(true); }
}
