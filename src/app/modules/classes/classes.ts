import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './classes.html',
  styleUrl: './classes.scss',
})
export class ClassesComponent {
  isCreatingClass = false;
  classesList = []; 
  classForm: FormGroup;

  streams = ['Science', 'Commerce', 'Arts', 'General'];

  constructor(private fb: FormBuilder) {
    this.classForm = this.fb.group({
      className: ['', Validators.required],
      section: ['', Validators.required],
      stream: ['General'],
      description: ['']
    });
  }

  startCreateClass() {
    this.isCreatingClass = true;
  }

  cancelCreate() {
    this.isCreatingClass = false;
  }
}
