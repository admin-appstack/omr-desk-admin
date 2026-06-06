import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InstituteWebsiteService } from '../../service/institute-website.service';
import { SnackBarService } from '../../../../common/services/snackbar.service';

@Component({
  selector: 'app-edit-page-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './edit-page-dialog.html',
  styleUrl: './edit-page-dialog.scss',
})
export class EditPageDialog implements OnInit {
  pageName = '';
  /** Internal slug used for API calls: 'home' | 'about' | 'courses' | 'contact' | 'test-series' | 'results' */
  pageSlug = '';

  isLoading = true;
  isSaving = false;

  // ---------------------------------------------------------------- Home Page Data
  heroTitle = 'Welcome to Our Institute';
  heroSubtitle = 'Empowering students to achieve their dreams with world-class education.';
  aboutParagraph = '';
  primaryButtonText = 'Apply Now';
  primaryButtonLink = '/apply';

  showAnnouncement = true;
  announcementText = 'Admissions open for 2024-2025 batch! Apply now to get early bird discount.';

  statsList: any[] = [
    { value: '15+', label: 'Years of Excellence' },
    { value: '5000+', label: 'Successful Alumni' },
    { value: '50+', label: 'Expert Faculties' },
  ];

  featuresList: any[] = [
    { title: 'Modern Campus', description: 'State of the art facilities and smart classrooms.', icon: 'business' },
    { title: 'Expert Faculty', description: 'Learn from industry professionals.', icon: 'school' },
  ];

  videoTourUrl = '';

  testimonialsList: any[] = [
    // { studentName: 'Sarah Jenkins', course: 'Computer Science', quote: 'This institute changed my life! The mentors are fantastic and the structured OMR feedback was a game-changer.', image: null, initials: 'SJ' },
    // { studentName: 'Aarav Mehta', course: 'JEE Advanced Prep', quote: 'The study methodology and the mock exams helped me build speed and accuracy under pressure.', image: null, initials: 'AM' },
    // { studentName: 'Priya Sharma', course: 'NEET Foundation', quote: 'The detailed concept-wise results pinpointed exactly which sections of Biology I needed to focus on.', image: null, initials: 'PS' },
    // { studentName: 'Rahul Verma', course: 'Class 10 Boards', quote: 'Highly qualified educators who make learning extremely fun and concept-focused.', image: null, initials: 'RV' },
    // { studentName: 'Neha Deshmukh', course: 'KVPY Batch', quote: 'The hybrid classroom model made it super convenient to clear doubts online and offline.', image: null, initials: 'ND' },
    // { studentName: 'Vikram Malhotra', course: 'JEE Mains Sprint', quote: 'Weekly test series with instantaneous OMR grading completely eliminated my exam anxiety.', image: null, initials: 'VM' }
  ];

  faqsList: any[] = [
    // { question: 'What is the process for admission?', answer: 'You can register online through our website application form, select your course, and pay the registration fee.' },
    // { question: 'Do you offer hybrid or online classes?', answer: 'Yes! We offer online lectures, offline classroom batches, and hybrid modes with physical doubt-solving sessions.' },
    // { question: 'How does the OMR test grading system work?', answer: 'Students take physical exams on OMR sheets. These sheets are scanned instantly, and performance scorecards are uploaded to the portal within minutes.' },
    // { question: 'What are the timings for weekend batches?', answer: 'Weekend batches run on Saturdays and Sundays. Typical sessions start at 9:00 AM and end at 2:00 PM.' },
    // { question: 'Are there scholarship opportunities available?', answer: 'Yes, we conduct scholarship tests (SATs) periodically. Based on performance, students can secure up to 100% tuition fee waivers.' },
    // { question: 'How are doubts handled outside of class hours?', answer: 'We have dedicated online doubt groups active 24/7, plus physical doubt desks open from 8:00 AM to 7:00 PM daily.' },
    // { question: 'What is the refund policy for course cancellation?', answer: 'We offer a full refund if requested within 7 days of course commencement, minus standard administrative fees.' },
    // { question: 'Can I switch batches or streams mid-session?', answer: 'Yes, batch switching is permitted within the first month, subject to coordinator approval and seat availability.' },
    // { question: 'Is comprehensive study material provided?', answer: 'Yes, we provide printed workbooks, syllabus booklets, formula cheat-sheets, and online question banks.' },
    // { question: 'How can parents track their child\'s progress?', answer: 'Parents receive automated SMS alerts for exam marks and attendance, along with detailed monthly progress reports on our portal.' },
    // { question: 'Are there courses for Class 9 and 10 foundation?', answer: 'Yes, our foundation batches build core science/math logic to prepare junior students for NTSE, Olympiads, and school boards.' },
    // { question: 'What are the qualifications of the teaching staff?', answer: 'Our educators consist of IIT/NIT alumni, experienced board examiners, and top subject experts with years of experience.' }
  ];

  // ---------------------------------------------------------------- About Us Data
  aboutHeading = 'Our Story';
  establishedYear = '';
  aboutMission = '';
  aboutVision = '';
  coreValues = '';
  principalName = '';
  principalMessage = '';
  teamList: any[] = [
    { name: 'John Smith', role: 'Head of Mathematics', description: 'With over 20 years of experience.', image: null },
  ];

  affiliationsList: any[] = [
    { name: 'National Education Board', logo: null },
  ];

  milestonesList: any[] = [
    { year: '1995', title: 'Foundation', description: 'The institute was founded with a vision to provide quality education.' },
  ];

  // ---------------------------------------------------------------- Courses Data
  coursesHeading = 'Explore Our Programs';
  coursesDescription = '';
  admissionProcess = '';
  learningBenefits = '';
  coursesList: any[] = [
    { name: 'Mathematics 101', description: 'Fundamental principles of mathematics.', duration: '6 Months', mode: 'Offline', fees: '₹5000', eligibility: 'High School Diploma', image: null },
  ];

  // ---------------------------------------------------------------- Contact Us Data
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

  // ---------------------------------------------------------------- Test Series Data
  testSeriesHeading = 'Mock Exams & Practice Tests';
  testSeriesDescription = 'Prepare for your exams with our comprehensive test series.';
  testSeriesList: any[] = [
    { name: 'JEE Mains Mock Test 2024', category: 'Engineering', description: 'Full-length mock tests.', numberOfTests: '15 Tests', price: '₹999', image: null },
  ];

  // ---------------------------------------------------------------- Recent Results Data
  resultsHeading = 'Our Hall of Fame';
  resultsDescription = 'Celebrating the outstanding achievements of our students.';
  resultsList: any[] = [
    { studentName: 'Rahul Kumar', examName: 'JEE Advanced 2023', score: 'AIR 45', description: 'Outstanding performance.', image: null },
  ];
  resultVideoUrl = '';
  resultStatsList: any[] = [
    { value: '150+', label: 'Total Selections in 2023' },
    { value: '10', label: 'Top 100 All India Ranks' },
  ];

  // Generic Page Content (Fallback)
  pageContent = '';

  constructor(
    public dialogRef: MatDialogRef<EditPageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; pageName: string },
    private websiteService: InstituteWebsiteService,
    private snackBarService: SnackBarService,
    private cdr: ChangeDetectorRef,
  ) {
    this.pageName = data?.name ?? '';
    this.pageSlug = data?.pageName ?? '';
  }

  ngOnInit(): void {
    if (!this.pageSlug) {
      this.isLoading = false;
      return;
    }
    this.websiteService.getPageContent(this.pageSlug).subscribe({
      next: (pageContent) => {
        this.populateForm(pageContent);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
        // Keep default values if load fails
      },
    });
  }

  private populateForm(content: any): void {
    if (!content) return;
    switch (this.pageSlug) {
      case 'home':
        this.heroTitle = content.heroTitle ?? this.heroTitle;
        this.heroSubtitle = content.heroSubtitle ?? this.heroSubtitle;
        this.aboutParagraph = content.aboutParagraph ?? this.aboutParagraph;
        this.primaryButtonText = content.primaryButtonText ?? this.primaryButtonText;
        this.primaryButtonLink = content.primaryButtonLink ?? this.primaryButtonLink;
        this.showAnnouncement = content.showAnnouncement ?? this.showAnnouncement;
        this.announcementText = content.announcementText ?? this.announcementText;
        this.statsList = content.statsList?.length ? content.statsList : this.statsList;
        this.featuresList = content.featuresList?.length ? content.featuresList : this.featuresList;
        this.videoTourUrl = content.videoTourUrl ?? this.videoTourUrl;
        this.testimonialsList = content.testimonialsList?.length ? content.testimonialsList : this.testimonialsList;
        this.faqsList = content.faqsList?.length ? content.faqsList : this.faqsList;
        break;
      case 'about':
        this.aboutHeading = content.aboutHeading ?? this.aboutHeading;
        this.establishedYear = content.establishedYear ?? this.establishedYear;
        this.aboutMission = content.aboutMission ?? this.aboutMission;
        this.aboutVision = content.aboutVision ?? this.aboutVision;
        this.coreValues = content.coreValues ?? this.coreValues;
        this.principalName = content.principalName ?? this.principalName;
        this.principalMessage = content.principalMessage ?? this.principalMessage;
        this.teamList = content.teamList?.length ? content.teamList : this.teamList;
        this.affiliationsList = content.affiliationsList?.length ? content.affiliationsList : this.affiliationsList;
        this.milestonesList = content.milestonesList?.length ? content.milestonesList : this.milestonesList;
        break;
      case 'courses':
        this.coursesHeading = content.coursesHeading ?? this.coursesHeading;
        this.coursesDescription = content.coursesDescription ?? this.coursesDescription;
        this.admissionProcess = content.admissionProcess ?? this.admissionProcess;
        this.learningBenefits = content.learningBenefits ?? this.learningBenefits;
        this.coursesList = content.coursesList?.length ? content.coursesList : this.coursesList;
        break;
      case 'contact':
        this.contactAddress = content.contactAddress ?? this.contactAddress;
        this.contactPhone = content.contactPhone ?? this.contactPhone;
        this.contactEmail = content.contactEmail ?? this.contactEmail;
        this.contactMapLink = content.contactMapLink ?? this.contactMapLink;
        this.workingHours = content.workingHours ?? this.workingHours;
        this.enableContactForm = content.enableContactForm ?? this.enableContactForm;
        this.contactFormEmail = content.contactFormEmail ?? this.contactFormEmail;
        this.socialFacebook = content.socialLinks?.facebook ?? this.socialFacebook;
        this.socialTwitter = content.socialLinks?.twitter ?? this.socialTwitter;
        this.socialInstagram = content.socialLinks?.instagram ?? this.socialInstagram;
        this.socialLinkedIn = content.socialLinks?.linkedin ?? this.socialLinkedIn;
        this.socialYoutube = content.socialLinks?.youtube ?? this.socialYoutube;
        break;
      case 'test-series':
        this.testSeriesHeading = content.testSeriesHeading ?? this.testSeriesHeading;
        this.testSeriesDescription = content.testSeriesDescription ?? this.testSeriesDescription;
        this.testSeriesList = content.testSeriesList?.length ? content.testSeriesList : this.testSeriesList;
        break;
      case 'results':
        this.resultsHeading = content.resultsHeading ?? this.resultsHeading;
        this.resultsDescription = content.resultsDescription ?? this.resultsDescription;
        this.resultVideoUrl = content.resultVideoUrl ?? this.resultVideoUrl;
        this.resultStatsList = content.resultStatsList?.length ? content.resultStatsList : this.resultStatsList;
        this.resultsList = content.resultsList?.length ? content.resultsList : this.resultsList;
        break;
    }
  }

  private buildPayload(): any {
    switch (this.pageSlug) {
      case 'home':
        return {
          heroTitle: this.heroTitle,
          heroSubtitle: this.heroSubtitle,
          aboutParagraph: this.aboutParagraph,
          primaryButtonText: this.primaryButtonText,
          primaryButtonLink: this.primaryButtonLink,
          showAnnouncement: this.showAnnouncement,
          announcementText: this.announcementText,
          statsList: this.statsList,
          featuresList: this.featuresList,
          videoTourUrl: this.videoTourUrl,
          testimonialsList: this.testimonialsList,
          faqsList: this.faqsList,
        };
      case 'about':
        return {
          aboutHeading: this.aboutHeading,
          establishedYear: this.establishedYear,
          aboutMission: this.aboutMission,
          aboutVision: this.aboutVision,
          coreValues: this.coreValues,
          principalName: this.principalName,
          principalMessage: this.principalMessage,
          teamList: this.teamList,
          affiliationsList: this.affiliationsList,
          milestonesList: this.milestonesList,
        };
      case 'courses':
        return {
          coursesHeading: this.coursesHeading,
          coursesDescription: this.coursesDescription,
          admissionProcess: this.admissionProcess,
          learningBenefits: this.learningBenefits,
          coursesList: this.coursesList,
        };
      case 'contact':
        return {
          contactAddress: this.contactAddress,
          contactPhone: this.contactPhone,
          contactEmail: this.contactEmail,
          contactMapLink: this.contactMapLink,
          workingHours: this.workingHours,
          enableContactForm: this.enableContactForm,
          contactFormEmail: this.contactFormEmail,
          socialLinks: {
            facebook: this.socialFacebook,
            twitter: this.socialTwitter,
            instagram: this.socialInstagram,
            linkedin: this.socialLinkedIn,
            youtube: this.socialYoutube,
          },
        };
      case 'test-series':
        return {
          testSeriesHeading: this.testSeriesHeading,
          testSeriesDescription: this.testSeriesDescription,
          testSeriesList: this.testSeriesList,
        };
      case 'results':
        return {
          resultsHeading: this.resultsHeading,
          resultsDescription: this.resultsDescription,
          resultVideoUrl: this.resultVideoUrl,
          resultStatsList: this.resultStatsList,
          resultsList: this.resultsList,
        };
      default:
        return { pageContent: this.pageContent };
    }
  }

  // ---------------------------------------------------------------- List manipulation
  triggerUpload() { alert('File upload dialog would open here.'); }
  addCourse() { this.coursesList.push({ name: '', description: '', duration: '', mode: 'Offline', fees: '', eligibility: '', image: null }); }
  removeCourse(i: number) { this.coursesList.splice(i, 1); }
  addTeamMember() { this.teamList.push({ name: '', role: '', description: '', image: null }); }
  removeTeamMember(i: number) { this.teamList.splice(i, 1); }
  addAffiliation() { this.affiliationsList.push({ name: '', logo: null }); }
  removeAffiliation(i: number) { this.affiliationsList.splice(i, 1); }
  addMilestone() { this.milestonesList.push({ year: '', title: '', description: '' }); }
  removeMilestone(i: number) { this.milestonesList.splice(i, 1); }
  addStat() { this.statsList.push({ value: '', label: '' }); }
  removeStat(i: number) { this.statsList.splice(i, 1); }
  addFeature() { this.featuresList.push({ title: '', description: '', icon: '' }); }
  removeFeature(i: number) { this.featuresList.splice(i, 1); }
  addTestimonial() { this.testimonialsList.push({ studentName: '', course: '', quote: '', image: null }); }
  removeTestimonial(i: number) { this.testimonialsList.splice(i, 1); }
  addFaq() { this.faqsList.push({ question: '', answer: '' }); }
  removeFaq(i: number) { this.faqsList.splice(i, 1); }
  addTestSeries() { this.testSeriesList.push({ name: '', category: '', description: '', numberOfTests: '', price: '', image: null }); }
  removeTestSeries(i: number) { this.testSeriesList.splice(i, 1); }
  addResult() { this.resultsList.push({ studentName: '', examName: '', score: '', description: '', image: null }); }
  removeResult(i: number) { this.resultsList.splice(i, 1); }
  addResultStat() { this.resultStatsList.push({ value: '', label: '' }); }
  removeResultStat(i: number) { this.resultStatsList.splice(i, 1); }

  close(): void { this.dialogRef.close(false); }

  save(): void {
    if (!this.pageSlug) { this.dialogRef.close(true); return; }
    this.isSaving = true;
    const payload = this.buildPayload();
    this.websiteService.updatePageContent(this.pageSlug, payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.isSaving = false;
        this.snackBarService.showError('Failed to save page content. Please try again.');
      },
    });
  }
}

