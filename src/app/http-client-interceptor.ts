/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
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
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { StoredObject } from './auth/localStore-object';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  private authToken: string | undefined = '';
  constructor(
    private localStorageService: LocalStorageService
  ) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    //const token = localStorage.getItem('authenticationtoken');
    const token = this.localStorageService.get<StoredObject>('authenticationtoken');
    this.authToken = token?.value;
    console.log('jwt token ' + token);
    if (this.authToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + this.authToken.replace(/['"]+/g,''))
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
