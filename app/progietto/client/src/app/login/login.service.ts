import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  validateLogin(user: User) {
    console.log('validateLogin: '+JSON.stringify(user));
    console.log('------------------------------');
    return this.http.post('/api/user/login', {
      username: user.username,
      password: user.password
     /* name: user.name,
      vinte: user.vinte,
      perse: user.perse,
      giocate: user.giocate
      */
    });
  }

  updateVinte(user: User) {
    console.log('[updateVinte] username: '+user.username+' name: '+user.name);
    console.log(JSON.stringify(user));
    return this.http.post('/api/post/updateVinte',{
      // id: user._id,
      username: user.username,
      name: user.name,
      
      password: user.password,
      isonline: true
      
    });
  }
  
  /*
  updatePost(post: Post) {
    return this.http.post('/api/post/updatePost', {
      id: post._id,
      title: post.title,
      description: post.description
    });
  }
  */
}
