import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = new User();

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('users', this.user).subscribe(res => {
      this.loginService.login({userName: this.user.userName,
        password: this.user.password})
        .subscribe(r => r && this.router.navigateByUrl('/') );
    });
  }

}
