import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  requestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  isvalidForm = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.requestResetForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+'
          ),
        ],
        this.forbiddenEmails
      ),
    });
  }

  invalidEmailMessage() {
    if (
      this.requestResetForm.controls.email.hasError('required') &&
      this.requestResetForm.controls.email.touched
    ) {
      return 'Email is Required!';
    } else if (
      this.requestResetForm.controls.email.touched &&
      this.requestResetForm.controls.email.invalid
    ) {
      return 'Email is not valid!';
    } else {
      return '';
    }
  }

  touchInvalidCheck(formElementName: string) {
    console.log(this.requestResetForm.controls[formElementName]);

    return (
      this.requestResetForm.controls[formElementName].invalid &&
      this.requestResetForm.controls[formElementName].touched
    );
  }

  requestResetUser(form) {
    console.log(form);
    if (form.valid) {
      this.isvalidForm = true;
      this.authService.requestReset(this.requestResetForm.value).subscribe(
        (data) => {
          this.requestResetForm.reset();
          this.successMessage =
            'Reset password link send to email sucessfully.';
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['sign-in']);
          }, 3000);
        },
        (err) => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.isvalidForm = false;
    }
  }
}
