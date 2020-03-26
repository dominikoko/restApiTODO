import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map,catchError} from 'rxjs/operators'

import {User} from './user' 

@Injectable()
export class RegistrationService {

  userUrl = "http://localhost:3000/register"

  constructor(private http: HttpClient) {   
  }
  
  register(user: User):Observable<User> {
    let httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
return this.http.post<User>(this.userUrl+"/registerNewUser", user, httpOptions).
pipe(
catchError(this.handleError)
)
}


private handleError(error: Response | any) {
  console.error(error.message || error);
  return Observable.throw(error.status);
}
}
