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
import { ConfirmationModalComponent } from '../../../../common/modals/confirmation-modal/confirmation-modal';

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
    ConfirmationModalComponent,
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
  heroBadgeText = 'Admissions Open 2026-27';
  heroTitle = 'Welcome to Our Institute';
  heroSubtitle = 'Empowering students to achieve their dreams with world-class education.';
  heroImage = '';
  showHeroImage = true;
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

  featuresTitle = 'Core Features';

  featuresList: any[] = [
    { title: 'Modern Campus', description: 'State of the art facilities and smart classrooms.', icon: 'fa-thin fa-business' },
    { title: 'Expert Faculty', description: 'Learn from industry professionals.', icon: 'fa-thin fa-graduation-cap' },
  ];

  videoTourUrl = '';

  testimonialsList: any[] = [];

  faqsList: any[] = [];

  // ---------------------------------------------------------------- About Us Data
  aboutHeading = 'Our Story';
  institutionPhoto = '';
  principalPhoto = '';
  bannerImage = '';
  showBannerImage = true;
  isUploadingFile = false;
  uploadingFieldKey = ''; // tracks which field is currently uploading
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
  bannerImageCourses = '';
  showBannerImageCourses = true;
  admissionProcess = '';
  learningBenefits = '';
  coursesList: any[] = [
    { name: 'Mathematics 101', description: 'Fundamental principles of mathematics.', duration: '6 Months', mode: 'Offline', fees: '₹5000', eligibility: 'High School Diploma', image: null },
  ];

  // ---------------------------------------------------------------- Contact Us Data
  contactAddress = '';
  contactPhone = '';
  contactEmail = '';
  bannerImageContact = '';
  showBannerImageContact = true;
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
  bannerImageTestSeries = '';
  showBannerImageTestSeries = true;
  testSeriesList: any[] = [
    { name: 'JEE Mains Mock Test 2024', category: 'Engineering', description: 'Full-length mock tests.', numberOfTests: '15 Tests', price: '₹999', image: null },
  ];

  // ---------------------------------------------------------------- Recent Results Data
  resultsHeading = 'Our Hall of Fame';
  resultsDescription = 'Celebrating the outstanding achievements of our students.';
  bannerImageResults = '';
  showBannerImageResults = true;
  resultsList: any[] = [
    { studentName: 'Rahul Kumar', examName: 'JEE Advanced 2023', score: 'AIR 45', description: 'Outstanding performance.', image: null },
  ];
  resultVideoUrl = '';
  resultStatsList: any[] = [
    { value: '150+', label: 'Total Selections in 2023' },
    { value: '10', label: 'Top 100 All India Ranks' },
  ];

  // ---------------------------------------------------------------- Footer Data
  footerCopyrightText = '© 2026 My Institute. All Rights Reserved.';
  footerAddress = '';
  footerPhone = '';
  footerEmail = '';
  footerSocialLinks: any[] = [];
  footerQuickLinks: any[] = [];


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
        this.heroBadgeText = content.heroBadgeText ?? this.heroBadgeText;
        this.heroTitle = content.heroTitle ?? this.heroTitle;
        this.heroSubtitle = content.heroSubtitle ?? this.heroSubtitle;
        this.heroImage = content.heroImage ?? this.heroImage;
        this.showHeroImage = content.showHeroImage ?? this.showHeroImage;
        this.aboutParagraph = content.aboutParagraph ?? this.aboutParagraph;
        this.primaryButtonText = content.primaryButtonText ?? this.primaryButtonText;
        this.primaryButtonLink = content.primaryButtonLink ?? this.primaryButtonLink;
        this.showAnnouncement = content.showAnnouncement ?? this.showAnnouncement;
        this.announcementText = content.announcementText ?? this.announcementText;
        this.statsList = content.statsList?.length ? content.statsList : this.statsList;
        this.featuresTitle = content.featuresTitle ?? this.featuresTitle;
        this.featuresList = content.featuresList?.length ? content.featuresList : this.featuresList;
        this.videoTourUrl = content.videoTourUrl ?? this.videoTourUrl;
        this.testimonialsList = content.testimonialsList?.length ? content.testimonialsList : this.testimonialsList;
        this.faqsList = content.faqsList?.length ? content.faqsList : this.faqsList;
        break;
      case 'about':
        this.aboutHeading = content.aboutHeading ?? this.aboutHeading;
        this.institutionPhoto = content.institutionPhoto ?? this.institutionPhoto;
        this.bannerImage = content.bannerImage ?? this.bannerImage;
        this.showBannerImage = content.showBannerImage ?? this.showBannerImage;
        this.establishedYear = content.establishedYear ?? this.establishedYear;
        this.aboutParagraph = content.aboutParagraph ?? this.aboutParagraph;
        this.aboutMission = content.aboutMission ?? this.aboutMission;
        this.aboutVision = content.aboutVision ?? this.aboutVision;
        this.coreValues = content.coreValues ?? this.coreValues;
        this.principalName = content.principalName ?? this.principalName;
        this.principalPhoto = content.principalPhoto ?? this.principalPhoto;
        this.principalMessage = content.principalMessage ?? this.principalMessage;
        this.teamList = content.teamList?.length ? content.teamList : this.teamList;
        this.affiliationsList = content.affiliationsList?.length ? content.affiliationsList : this.affiliationsList;
        this.milestonesList = content.milestonesList?.length ? content.milestonesList : this.milestonesList;
        break;
      case 'courses':
        this.coursesHeading = content.coursesHeading ?? this.coursesHeading;
        this.coursesDescription = content.coursesDescription ?? this.coursesDescription;
        this.bannerImageCourses = content.bannerImage ?? this.bannerImageCourses;
        this.showBannerImageCourses = content.showBannerImage ?? this.showBannerImageCourses;
        this.admissionProcess = content.admissionProcess ?? this.admissionProcess;
        this.learningBenefits = content.learningBenefits ?? this.learningBenefits;
        this.coursesList = content.coursesList?.length ? content.coursesList : this.coursesList;
        break;
      case 'contact':
        this.contactAddress = content.contactAddress ?? this.contactAddress;
        this.contactPhone = content.contactPhone ?? this.contactPhone;
        this.contactEmail = content.contactEmail ?? this.contactEmail;
        this.bannerImageContact = content.bannerImage ?? this.bannerImageContact;
        this.showBannerImageContact = content.showBannerImage ?? this.showBannerImageContact;
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
        this.bannerImageTestSeries = content.bannerImage ?? this.bannerImageTestSeries;
        this.showBannerImageTestSeries = content.showBannerImage ?? this.showBannerImageTestSeries;
        this.testSeriesList = content.testSeriesList?.length ? content.testSeriesList : this.testSeriesList;
        break;
      case 'results':
        this.resultsHeading = content.resultsHeading ?? this.resultsHeading;
        this.resultsDescription = content.resultsDescription ?? this.resultsDescription;
        this.bannerImageResults = content.bannerImage ?? this.bannerImageResults;
        this.showBannerImageResults = content.showBannerImage ?? this.showBannerImageResults;
        this.resultVideoUrl = content.resultVideoUrl ?? this.resultVideoUrl;
        this.resultStatsList = content.resultStatsList?.length ? content.resultStatsList : this.resultStatsList;
        this.resultsList = content.resultsList?.length ? content.resultsList : this.resultsList;
        break;
      case 'footer':
        this.footerCopyrightText = content.copyrightText ?? this.footerCopyrightText;
        this.footerAddress = content.address ?? this.footerAddress;
        this.footerPhone = content.phone ?? this.footerPhone;
        this.footerEmail = content.email ?? this.footerEmail;
        this.footerSocialLinks = content.socialLinks?.length ? content.socialLinks : this.footerSocialLinks;
        this.footerQuickLinks = content.quickLinks?.length ? content.quickLinks : this.footerQuickLinks;
        break;
    }
  }

  private buildPayload(): any {
    switch (this.pageSlug) {
      case 'home':
        return {
          heroBadgeText: this.heroBadgeText,
          heroTitle: this.heroTitle,
          heroSubtitle: this.heroSubtitle,
          heroImage: this.heroImage,
          showHeroImage: this.showHeroImage,
          aboutParagraph: this.aboutParagraph,
          primaryButtonText: this.primaryButtonText,
          primaryButtonLink: this.primaryButtonLink,
          showAnnouncement: this.showAnnouncement,
          announcementText: this.announcementText,
          statsList: this.statsList,
          featuresTitle: this.featuresTitle,
          featuresList: this.featuresList,
          videoTourUrl: this.videoTourUrl,
          testimonialsList: this.testimonialsList,
          faqsList: this.faqsList,
        };
      case 'about':
        return {
          aboutHeading: this.aboutHeading,
          institutionPhoto: this.institutionPhoto,
          bannerImage: this.bannerImage,
          showBannerImage: this.showBannerImage,
          aboutParagraph: this.aboutParagraph,
          establishedYear: this.establishedYear,
          aboutMission: this.aboutMission,
          aboutVision: this.aboutVision,
          coreValues: this.coreValues,
          principalName: this.principalName,
          principalPhoto: this.principalPhoto,
          principalMessage: this.principalMessage,
          teamList: this.teamList,
          affiliationsList: this.affiliationsList,
          milestonesList: this.milestonesList,
        };
      case 'courses':
        return {
          coursesHeading: this.coursesHeading,
          coursesDescription: this.coursesDescription,
          bannerImage: this.bannerImageCourses,
          showBannerImage: this.showBannerImageCourses,
          admissionProcess: this.admissionProcess,
          learningBenefits: this.learningBenefits,
          coursesList: this.coursesList,
        };
      case 'contact':
        return {
          contactAddress: this.contactAddress,
          contactPhone: this.contactPhone,
          contactEmail: this.contactEmail,
          bannerImage: this.bannerImageContact,
          showBannerImage: this.showBannerImageContact,
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
          bannerImage: this.bannerImageTestSeries,
          showBannerImage: this.showBannerImageTestSeries,
          testSeriesList: this.testSeriesList,
        };
      case 'results':
        return {
          resultsHeading: this.resultsHeading,
          resultsDescription: this.resultsDescription,
          bannerImage: this.bannerImageResults,
          showBannerImage: this.showBannerImageResults,
          resultVideoUrl: this.resultVideoUrl,
          resultStatsList: this.resultStatsList,
          resultsList: this.resultsList,
        };
      case 'footer':
        return {
          copyrightText: this.footerCopyrightText,
          address: this.footerAddress,
          phone: this.footerPhone,
          email: this.footerEmail,
          socialLinks: this.footerSocialLinks,
          quickLinks: this.footerQuickLinks,
        };
      default:
        return { pageContent: this.pageContent };
    }
  }

  // ---------------------------------------------------------------- List manipulation
  triggerUpload() { /* replaced by pickImage() */ }

  /**
   * Universal image upload handler.
   * Creates a hidden file input, opens it, then uploads the chosen file
   * and calls `setter(url)` with the resulting R2 URL.
   * @param fieldKey  A unique string to track which upload is in progress (for UI feedback)
   * @param setter    A callback that stores the returned URL
   */
  pickImage(fieldKey: string, setter: (url: string) => void): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.onchange = (event: any) => {
      const file: File | undefined = event.target.files?.[0];
      document.body.removeChild(input);
      if (!file) return;

      this.uploadingFieldKey = fieldKey;
      this.isUploadingFile = true;
      this.cdr.detectChanges();

      this.websiteService.uploadAsset(file).subscribe({
        next: (url: string) => {
          setter(url);
          this.uploadingFieldKey = '';
          this.isUploadingFile = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.uploadingFieldKey = '';
          this.isUploadingFile = false;
          this.snackBarService.showError('Failed to upload image. Please try again.');
          this.cdr.detectChanges();
        },
      });
    };

    input.click();
  }

  /** Legacy single-file handler kept for the About page institution photo input */
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.pickImage('institutionPhoto', (url) => this.institutionPhoto = url);
    }
  }

  isUploading(fieldKey: string): boolean {
    return this.isUploadingFile && this.uploadingFieldKey === fieldKey;
  }

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
  addFooterSocial() { this.footerSocialLinks.push({ platform: '', url: '' }); }
  removeFooterSocial(i: number) { this.footerSocialLinks.splice(i, 1); }
  addFooterQuickLink() { this.footerQuickLinks.push({ label: '', url: '' }); }
  removeFooterQuickLink(i: number) { this.footerQuickLinks.splice(i, 1); }

  
  // Image Deletion
  showDeleteConfirm = false;
  deleteTargetArr: any[] | null = null;
  deleteIndex: number = -1;
  deletePropName: string = '';

  promptDeleteFlatImage(prop: string) {
    this.deletePropName = prop;
    this.deleteTargetArr = null;
    this.showDeleteConfirm = true;
  }

  promptDeleteArrayImage(arr: any[], index: number, prop: string) {
    this.deleteTargetArr = arr;
    this.deleteIndex = index;
    this.deletePropName = prop;
    this.showDeleteConfirm = true;
  }

  confirmDeleteImage() {
    if (this.deleteTargetArr && this.deleteIndex >= 0) {
      this.deleteTargetArr[this.deleteIndex][this.deletePropName] = '';
    } else if (this.deletePropName) {
      (this as any)[this.deletePropName] = '';
    }
    this.cancelDeleteImage();
  }

  cancelDeleteImage() {
    this.showDeleteConfirm = false;
    this.deleteTargetArr = null;
    this.deleteIndex = -1;
    this.deletePropName = '';
  }

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

