import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { RegistationService } from './registation.service';

@Component({
  selector: 'app-registation',
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.css'],
  providers: [ RegistationService ]
})


export class RegistationComponent implements OnInit {

  public user: User;

  constructor(private RegService: RegistationService, private router: Router, private commonService: CommonService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  /*adduser() {
     if (this.user.name && this.user.name && this.user.password) {


       } else {
      alert('Title and Description required');
    }
  }*/


  provaPerHeader() {
    let myToken
    this.RegService.provaPerHeaderPd().subscribe(
      result => {
        myToken = result['token'];
        // localStorage.setItem('loggedInUser', this.user.username);
        console.log("autenticazione col token corretta: " + result['token']);

        console.log("prova: " + myToken);
        this.RegService.provaProtected(myToken).subscribe(
          result => {
            console.log("autenticazione col token corretta: " + result['text']);
          }
        )
      }
    )



  }

  adduser() {
    if (this.user.name && this.user.username && this.user.password) {
      this.RegService.validateRegistration(this.user).subscribe(
        result => {
          if (result['status'] === 'gia_esiste') {
           alert('I dati già esistono nel database ');
          } else {
            this.RegService.addUser(this.user).subscribe(res => {
            this.commonService.notifyReg();
            //localStorage.setItem('loggedInUser', this.user.username);
            this.router.navigate(['/login']);
            },
            error => {
              console.log('error is ', error);
            });
          }
        }
      );
    } else {
      alert('enter user name and password');
    }
  }

}
