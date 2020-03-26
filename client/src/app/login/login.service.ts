import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map,catchError} from 'rxjs/operators'
import { Router } from '@angular/router';
import {User} from './user' 

@Injectable()
export class LoginService {

  userUrl = "http://localhost:3000/login"

  constructor(private http: HttpClient,private router:Router) {   
  }
  loginUser(body: User) {
    return this.http.post(this.userUrl + '/loginUser', body, { observe: 'body'});
   }

  }