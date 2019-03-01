
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
@Injectable()

export class RegistationService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    //console.log("Registrazione: invio i dati");
    console.log('[Registrazioe]: '+JSON.stringify(user));
    return this.http.post('/api/user/create', {
      
      name: user.name,
      username: user.username,
      password: user.password,
      vinte: user.vinte,
      perse: user.perse,
      giocate: user.giocate,
      isonline: user.isonline,
      isingame: user.isingame,
      admin: user.admin
    });
  }

  provaPerHeaderPd(this){
    console.log("Chiamo la NON protected");
    return this.http.post('/api/login', {
      username: "dioporco",
      mail: "dioporco"
    });
  }

  provaProtected(myToken: String){
    console.log("Chiamo la PROTECTED con token: "+myToken);
    return this.http.post('api/protected',{
      token: myToken
    });
  }

  validateRegistration(user: User) {
    return this.http.post('/api/user/gia_esiste', {
      name: user.name,
      username: user.username,
      password: user.password
    });
  }



}
