import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [LoginComponent, ResetComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class LoginModule {}
