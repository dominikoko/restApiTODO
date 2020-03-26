import { Component, OnInit } from '@angular/core';
import {User} from './user'
import {FormsModule,FormArray, FormControl, FormGroup, Validators, NgModel, FormBuilder } from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router'
import { AlertsService } from 'angular-alert-module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  get f() { return this.loginForm.controls; }

  statusCode: number;
  user: User;
  requestProcessing = false;
  processValidation = false;

  loginForm = new FormGroup({
  username: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
   
  });
  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private alerts: AlertsService,
              private router: Router
    ) { }

  ngOnInit(): void {

    
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)] ],
      password: [null, [Validators.required, Validators.minLength(6)] ]
    });
  }

  loginFormSubmit(loginForm){this.loginService.loginUser(loginForm.value).subscribe((res) => {
    this.alerts.setMessage('Login successfully!', 'success');
     this.router.navigateByUrl('/register');
  },
    err => {
      // debugger
      // console.log(err);
      this.alerts.setMessage ('Login failed ', 'error');
    }
  );
  }
}
