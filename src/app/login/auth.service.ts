import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/resetpassword';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.httpClient.post<string>('/auth', {
      email,
      password,
    });
  }

  registerUser(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/register`, body);
  }

  loginUser(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/login`, body);
  }

  requestReset(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/req-reset-password`, body);
  }

  newPassword(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/new-password`, body);
  }

  validPasswordToken(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/valid-password-token`, body);
  }
}
