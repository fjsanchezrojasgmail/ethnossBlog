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
import { RegisterPayload } from '../register-payload';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,ReactiveFormsModule,HttpClientModule
  ],
  providers: [
    AuthService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/semi
  registerForm!: FormGroup;
  registerPayload!: RegisterPayload;
  constructor (private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.registerForm = this.formBuilder.group( 
      {
        username: '',
        email:'',
        password:'',
        confirmPassword:''
      }
    );
    this.registerPayload = 
      {
        username: '',
        email:'',
        password:'',
        confirmPassword:''
      };
  }
  ngOnInit(): void {
  }
  public onSubmit (): void {
    this.registerPayload.username = this.registerForm.get('username')?.value;
    this.registerPayload.email = this.registerForm.get('email')?.value;
    this.registerPayload.password = this.registerForm.get('password')?.value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword')?.value;

    this.authService.register(this.registerPayload).subscribe(
      data => {
        console.log('register success: ', data);
        this.router.navigateByUrl('/register-success');
        
      },
      error => {
        console.log('register failed: ', error);
        
      }
    );
  }
}
