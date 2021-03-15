import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+'
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form);

    if (this.form.valid) {
      this.authService
        .login(this.form.value.email, this.form.value.password)
        .subscribe(
          (res) => console.log(res),
          (error) => console.log(error)
        );
    }
  }
}
