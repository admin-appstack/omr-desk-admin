import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-create-role-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  templateUrl: './create-role-dialog.html',
  styleUrl: './create-role-dialog.scss',
})
export class CreateRoleDialog {
  roleName = '';
  roleDescription = '';

  permissions = [
    {
      module: 'Dashboard & Analytics',
      features: [
        { name: 'Overview', view: true, create: false, update: false, delete: false },
        { name: 'Reports', view: false, create: false, update: false, delete: false },
        { name: 'Widgets', view: false, create: false, update: false, delete: false }
      ]
    },
    {
      module: 'Institute Website',
      features: [
        { name: 'Settings', view: true, create: false, update: false, delete: false },
        { name: 'Theme', view: false, create: false, update: false, delete: false },
        { name: 'Pages', view: false, create: false, update: false, delete: false }
      ]
    },
    {
      module: 'User & Role Mgt',
      features: [
        { name: 'Users', view: false, create: false, update: false, delete: false },
        { name: 'Roles', view: false, create: false, update: false, delete: false }
      ]
    },
    {
      module: 'OMR Scanning',
      features: [
        { name: 'Scans', view: true, create: false, update: false, delete: false },
        { name: 'Results', view: false, create: false, update: false, delete: false },
        { name: 'Configs', view: false, create: false, update: false, delete: false }
      ]
    }
  ];

  constructor(public dialogRef: MatDialogRef<CreateRoleDialog>) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    // In a real app, send data to service
    this.dialogRef.close({
      name: this.roleName,
      description: this.roleDescription,
      permissions: this.permissions
    });
  }

  toggleModule(moduleObj: any, checked: boolean) {
    moduleObj.features.forEach((f: any) => {
      f.view = checked;
      f.create = checked;
      f.update = checked;
      f.delete = checked;
    });
  }

  isModuleIndeterminate(moduleObj: any): boolean {
    let selected = 0;
    let total = moduleObj.features.length * 4;
    moduleObj.features.forEach((f: any) => {
      if(f.view) selected++;
      if(f.create) selected++;
      if(f.update) selected++;
      if(f.delete) selected++;
    });
    return selected > 0 && selected < total;
  }

  isModuleAllSelected(moduleObj: any): boolean {
    return moduleObj.features.every((f: any) => f.view && f.create && f.update && f.delete);
  }
}
