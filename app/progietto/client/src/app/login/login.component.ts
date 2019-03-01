import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {
  public user: User;

  constructor(private loginService: LoginService, private router: Router) {
    this.user = new User();
  }

  validateLogin() {
    if (this.user.username && this.user.password) {
      this.loginService.validateLogin(this.user).subscribe(
        result => {
          if (result['status'] === 'success') {
            localStorage.setItem('token', result['token']);
            console.log("Ho messo in localStorage il token: "+result['token']);
            localStorage.setItem('loggedInUser', this.user.username);
            localStorage.setItem('userAdmin', this.user.admin);
           // console.log('[login-component] username: '+this.user.username+'  id: '+this.user._id);
            this.loginService.updateVinte(this.user).subscribe( res => {
              localStorage.setItem('isOnline', this.user.isonline);
            } ); //MODIFICA

            this.router.navigate(['/home']);
          } else {
            alert('Wrong username password');
          }
        },
        error => {
          console.log('error is ', error);
        }
      );
    } else {
      alert('enter user name and password');
    }
  }
}
