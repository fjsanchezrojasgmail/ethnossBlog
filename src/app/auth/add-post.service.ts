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
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostPayload } from '../add-post/post-payload';
import { Observable } from 'rxjs';

@Injectable()
export class AddPostService {

  private url: string = 'http://localhost:8080/api/posts/';

  constructor (
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpClient: HttpClient
  ) {}
    addPost (postPayload: PostPayload): Observable<any>{
      console.log("AddPost: ", postPayload); 
      return this.httpClient.post(this.url + "add", postPayload);
    }

  getAllPosts (): Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>(this.url + "all");
  }

  getPost (permaLink: Number) : Observable<PostPayload>{
    console.log("Url pedida: ",this.url + "get/" + permaLink);    
    return this.httpClient.get<PostPayload>(this.url + "get/" + permaLink);
  }
}