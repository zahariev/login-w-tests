import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthService', () => {
  it('should perform a post to /auth with email and password', () => {
    const email = 'email';
    const password = 'password';
    const httpClientStub: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
      'http',
      ['post']
    );
    const authService = new AuthService(httpClientStub);
    httpClientStub.post.and.returnValue(of());

    authService.login(email, password);

    expect(httpClientStub.post).toHaveBeenCalledWith('/auth', {
      email,
      password,
    });
  });
});
