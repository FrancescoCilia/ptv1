import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable()
export class ShowPostService {

	constructor(private http: HttpClient){

	}
	
	getAllPost(){
		//return this.http.post('/api/post/getAllPost',{})
		return this.http.post('/api/post/getClassifica',{})
	}

	deletePost(id){
		if(localStorage.getItem("userAdmin") == String(true) ){
			return this.http.post('/api/post/deletePost',{id : id})
		}
		else{
			alert("Questo utente non puo eliminarne altri");
		}
		//return this.http.post('/api/post/deletePost',{id : id})
	}

}