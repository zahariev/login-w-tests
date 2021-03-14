import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createSignupForm();
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        // email is required and must be a valid email email
        email: [
          null,
          [
            Validators.required,
            Validators.pattern(
              '[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+'
            ),
          ],
        ],
        // password: ['', Validators.required],
        password: [
          null,
          Validators.compose([
            // 1. Password Field is Required
            Validators.required,
            // 2. check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            // 3. check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // 4. check whether the entered password has a lower-case letter
            CustomValidators.patternValidator(/[a-z]/, { hasLowerCase: true }),
            // 5. check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true,
              }
            ),
            Validators.minLength(8),
          ]),
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  passwordCheck() {
    return (
      this.form.controls.password.invalid && this.form.controls.password.touched
    );
  }

  emailCheck() {
    return this.form.controls.email.invalid && this.form.controls.email.touched;
  }

  confirmCheck() {
    return (
      this.form.controls.confirmPassword.invalid &&
      this.form.controls.confirmPassword.touched
    );
  }

  invalidEmailMessage() {
    if (
      this.form.controls.email.hasError('required') &&
      this.form.controls.email.touched
    ) {
      return 'Email is Required!';
    } else if (
      this.form.controls.email.touched &&
      this.form.controls.email.invalid
    ) {
      return 'Email is not valid!';
    } else {
      return '';
    }
  }
}
