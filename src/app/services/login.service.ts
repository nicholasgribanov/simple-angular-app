import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'login';
  private logoutUrl = 'logout';
  loggedIn = false;
  private userLoginSource = new Subject<LoginUser>();
  userLogin$ = this.userLoginSource.asObservable();

  constructor(private http: HttpClient) {
  }

  login(user: LoginUser): Observable<boolean> {
    return this.http.post<boolean>(this.loginUrl, user)
      .pipe(tap(res => {
        if (res) {
          this.userLogin(user);
        }
      }));
  }

  logout() {
    return this.http.get(this.logoutUrl)
      .pipe(tap(res => this.userLogout()));
  }

  userLogin(user: LoginUser) {
    this.loggedIn = true;
    this.userLoginSource.next(user);
  }

  userLogout() {
    this.loggedIn = false;
    this.userLoginSource.next(null);
  }
}

export class LoginUser {
  userName: string;
  password: string;
}
