import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form with email and password inputs', () => {
    const element = fixture.nativeElement;

    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('#email')).toBeTruthy();
    expect(element.querySelector('#password')).toBeTruthy();
    expect(element.querySelector('#confirmPassword')).toBeTruthy();
    expect(element.querySelector('button')).toBeTruthy();
  });

  it('should return model invalid when form is empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validate email input as required', () => {
    const email = component.form.controls.email;

    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();
  });

  it('should validate password input as required', () => {
    const password = component.form.controls.password;

    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  });

  it('should validate email format', () => {
    const email = component.form.controls.email;
    email.setValue('test');
    const errors = email.errors;

    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeTruthy();
    expect(email.valid).toBeFalsy();
  });

  it('should validate email format correctly', () => {
    const email = component.form.controls.email;
    email.setValue('test@test.com');
    const errors = email.errors || {};

    expect(email.valid).toBeTruthy();
    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeFalsy();
  });

  it('should validate missing number in new password', () => {
    const password = component.form.controls.password;
    password.setValue('Asdd!');
    const errors = password.errors || {};

    expect(errors.hasNumber).toBeDefined();
    expect(errors.hasNumber).toBeTrue();
  });

  it('should validate missing spec char in new password', () => {
    const password = component.form.controls.password;
    password.setValue('Asdd1');
    const errors = password.errors || {};

    expect(errors.hasSpecialCharacters).toBeDefined();
    expect(errors.hasSpecialCharacters).toBeTrue();
  });

  it('should validate missing CapitalCase char in new password', () => {
    const password = component.form.controls.password;
    password.setValue('!asdd1');
    const errors = password.errors || {};

    expect(errors.hasCapitalCase).toBeDefined();
    expect(errors.hasCapitalCase).toBeTrue();
  });

  it('should validate missing LowerCase char in new password', () => {
    const password = component.form.controls.password;
    password.setValue('!AA1');
    const errors = password.errors || {};

    expect(errors.hasLowerCase).toBeDefined();
    expect(errors.hasLowerCase).toBeTrue();
  });

  it('should show password when clicked icon', () => {});
});
