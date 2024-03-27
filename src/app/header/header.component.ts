/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,HttpClientModule
  ],
  providers: [
    AuthService
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  @ViewChild('myDialog')
  myDialog!: ElementRef;

  public isAuthenticated: boolean = false;
  public display: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  onLogout(): void {  
    this.authService.logout();   
    this.display = false;
    this.router.navigateByUrl("/login");
  }
  
  showDialog() {
    this.display = true;
  }
  closeDialog(){
    this.display = false;
  }

}
