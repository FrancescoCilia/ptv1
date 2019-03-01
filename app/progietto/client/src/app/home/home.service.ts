import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class homeService {
  constructor(private http: HttpClient) {}



  updateIsOnlineToFalse(user: User) {
    console.log('[updateVinte] username: '+user.username+' name: '+user.name);
    console.log(JSON.stringify(user));
    return this.http.post('/api/post/updateIsOnline',{
      // id: user._id,
      username: user.username,
      name: user.name,
      password: user.password,
      isonline: false

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
