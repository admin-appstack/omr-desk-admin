import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoleDialog } from './create-role-dialog';

describe('CreateRoleDialog', () => {
  let component: CreateRoleDialog;
  let fixture: ComponentFixture<CreateRoleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRoleDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRoleDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
