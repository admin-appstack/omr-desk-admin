const fs = require('fs');
let html = fs.readFileSync('src/app/modules/institute-website/components/edit-page-dialog/edit-page-dialog.html', 'utf8');

html = html.replace(
  '<mat-form-field appearance="outline" class="full-width">\n          <mat-label>Core Values</mat-label>',
  `<mat-form-field appearance="outline" class="full-width mb-3">\n          <mat-label>Core Values Section Title</mat-label>\n          <input matInput [(ngModel)]="coreValuesTitle" placeholder="e.g. Core Values">\n        </mat-form-field>\n        <mat-form-field appearance="outline" class="full-width">`
);
html = html.replace('[(ngModel)]="coreValues" placeholder="e.g. Integrity, Excellence, Innovation (comma \nseparated)">', '[(ngModel)]="coreValues" placeholder="e.g. Integrity, Excellence, Innovation (comma \nseparated)">');

html = html.replace(
  `<mat-form-field appearance="outline" class="full-width">\n          <mat-label>Director's Message</mat-label>`,
  `<mat-form-field appearance="outline" class="full-width mb-3">\n          <mat-label>Director Message Section Title</mat-label>\n          <input matInput [(ngModel)]="principalMessageTitle" placeholder="e.g. From the Director's Desk">\n        </mat-form-field>\n        <mat-form-field appearance="outline" class="full-width">\n          <mat-label>Director's Message</mat-label>`
);

fs.writeFileSync('src/app/modules/institute-website/components/edit-page-dialog/edit-page-dialog.html', html);
console.log('HTML fixed');
