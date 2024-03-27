/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/keyword-spacing */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from '../auth/add-post.service';
import {Router} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {EditorModule} from '@tinymce/tinymce-angular';
import { HttpClientInterceptor } from '../http-client-interceptor';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  standalone: true,
  imports: [
    FormsModule,ReactiveFormsModule,HttpClientModule,EditorModule
  ],
  providers: [
    AddPostService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}
  ],
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  userName: string | null = '';
  title = new FormControl('');
  body = new FormControl('');

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private addpostService: AddPostService,
    private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: '',
      imageurl: ''
    }
  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.userName = localStorage.getItem('username');
    }
  }

  addPost() {
    this.postPayload.content = this.addPostForm.get('body')?.value;
    this.postPayload.title = this.addPostForm.get('title')?.value;
    this.postPayload.username = this.userName || '';
    this.addpostService.addPost(this.postPayload).subscribe(data => {
      console.log("AddPostComponent: ",data);    
      this.router.navigateByUrl('/home');
    }, error => {
      console.log('Failure Response: ', error);
    })
  }
}
