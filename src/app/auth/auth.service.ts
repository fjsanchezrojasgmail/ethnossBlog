/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/keyword-spacing */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/comma-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/space-before-blocks */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/semi */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable,PLATFORM_ID } from '@angular/core';
import { RegisterPayload } from './register-payload';
import { Observable, map, of } from 'rxjs';
import { LoginPayload } from './login-payload';
import { JwtAutResponse } from './jwt-aut-response';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from 'ngx-localstorage';
import { StoredObject } from './localStore-object';

@Injectable(
  {providedIn: 'root'}
)
export class AuthService {
  private url: string = 'http://localhost:8080/api/auth/';

  constructor (
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
    register (registerPayload: RegisterPayload): Observable<any>{
      return this.httpClient.post(this.url + 'signup', registerPayload);
    }
    login (loginPayload: LoginPayload): Observable<boolean>{
      return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload)
        .pipe(
          map(data => {
              
                this.localStorageService.set<StoredObject>('authenticationtoken', {
                  name: 'authenticationtoken',
                  value: JSON.stringify(data.authenticationToken)
                });

                this.localStorageService.set<StoredObject>('username', {
                  name: 'username',
                  value: JSON.stringify(data.username)
                });

                console.log(
                  "Guardados: ",
                   this.localStorageService.get('authenticationtoken'),
                   this.localStorageService.get('username')
                ); 

                localStorage.setItem('authenticationtoken', JSON.stringify(data.authenticationToken));
                localStorage.setItem('username', JSON.stringify(data.username));
               
              return true;
          })
        );
    }
    isAuthenticated (): boolean {
     /*  if(isPlatformBrowser(this.platformId)){
        return localStorage.getItem('username') != null;
      }else{
        return false;
      } */
      if(this.localStorageService.get('authenticationtoken') != null){
        return true;
      }else{
        return false;
      }
    }

    checkStatus (): Observable<boolean> {
      if(this.localStorageService.get('authenticationtoken') === null || this.localStorageService.get('authenticationtoken') === undefined){
        return of(false);
      }else{
        return of(true);
      }
    }

    loggedUser (): string | null | undefined {
     /*  if(isPlatformBrowser(this.platformId)){      
        return localStorage.getItem('username');
      }else{
        return '';
      } */
      if(this.localStorageService.get('authenticationtoken') != null){
        return this.localStorageService.get('authenticationtoken');
      }else{
        return '';
      }
    }
  
    logout () {
      this.localStorageService.clear();
    }
   
}
