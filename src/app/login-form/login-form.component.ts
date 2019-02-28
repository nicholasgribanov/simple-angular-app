import {Component, OnInit} from '@angular/core';
import {LoginService, LoginUser} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  userForm: LoginUser = new LoginUser();
  failedLogin: boolean;

  constructor(private loginService: LoginService,
              private router: Router) {
    this.loginService.userLogin$
      .subscribe(user => this.userForm = user || new LoginUser());
  }

  login() {
    this.loginService.login(this.userForm)
      .subscribe(res => res ?
        this.onSuccessLogin() :
        this.onFailLogin());
  }

  logout() {
    this.loginService.logout()
      .subscribe(res => this.onLogout());
  }

  onSuccessLogin() {
    this.router.navigateByUrl('/');
  }

  onFailLogin() {
    setTimeout(() => this.failedLogin = false, 1000);
  }

  onLogout() {
    this.router.navigateByUrl('/');
  }

  get loggedIn() {
    return this.loginService.loggedIn;
  }
}

