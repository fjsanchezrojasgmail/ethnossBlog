/* eslint-disable @typescript-eslint/comma-spacing */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { AddPostService } from './../auth/add-post.service';
import { Observable } from 'rxjs';
import { PostPayload } from '../add-post/post-payload';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,HttpClientModule
  ],
  providers: [
    AddPostService
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts!: Observable<Array<PostPayload>>;
  constructor (private postService: AddPostService) { }

  ngOnInit () {
    this.posts = this.postService.getAllPosts();
  }

}
