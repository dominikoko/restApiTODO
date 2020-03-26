import { Component, OnInit } from '@angular/core';
import {FormsModule,FormArray, FormControl, FormGroup, Validators, NgModel, FormBuilder } from '@angular/forms';
import * as uuid from "uuid";
import {Router} from '@angular/router'

import {RegistrationService} from './registration.service'
import {User} from './user'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  statusCode: number;
  user: User;
  requestProcessing = false;
  processValidation = false;

  get f() { return this.registrationForm.controls; }


  registrationForm = new FormGroup({
  username: new FormControl('', [Validators.required,Validators.minLength(3)]),
  email: new FormControl('', Validators.required),
  password: new FormControl('', [Validators.required,Validators.minLength(6)])
   
  });
  constructor(private registrationService: RegistrationService,
              private router: Router
    ) { }

  ngOnInit(): void {
    
  }
  userFormSubmit() {
    this.processValidation = true;
    if (this.registrationForm.invalid) {
    return; 
    }
    let user = this.registrationForm.value;
    this.registrationService.register(user).subscribe(users=>{
      user.userId = uuid.v4();        
        console.log(user,'this is form data');
   this.registrationService.register(user)
   window.alert("Registration Successful! Please Login!")
   this.router.navigateByUrl('/login');
            // .subscribe(successCode => {
            //        this.statusCode = successCode;
 
                    
                },
                errorCode => this.statusCode = errorCode
            );
        }        
    
}


