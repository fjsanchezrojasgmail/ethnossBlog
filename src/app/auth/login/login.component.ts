/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/key-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/comma-spacing */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/space-before-blocks */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginPayload } from '../login-payload';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
// eslint-disable-next-line @typescript-eslint/semi
  loginForm!: FormGroup;
  loginPayload!: LoginPayload;
  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group( 
      {
        username: '',
        password:''
      }
    );
    this.loginPayload = 
      {
        username: '',
        password:''
      };
  }
  ngOnInit(): void {
  }
  public onSubmit (): void {
    this.loginPayload.username = this.loginForm.get('username')?.value;
    
    this.loginPayload.password = this.loginForm.get('password')?.value; 

    this.authService.login(this.loginPayload).subscribe(
      data => {

        if (data){

          console.log('login success: ', data);
          this.router.navigateByUrl('/home');
        }
        
      },
      error => {
        console.log('login failed: ', error);
        
      }
    );
  }

}
