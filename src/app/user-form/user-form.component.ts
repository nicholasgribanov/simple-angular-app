import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = new User();

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('users', this.user).subscribe(res => {
      this.router.navigateByUrl('');
    });
  }

}
