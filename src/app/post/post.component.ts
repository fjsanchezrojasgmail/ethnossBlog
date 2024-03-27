/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable padded-blocks */
/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/comma-spacing */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/ban-types */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AddPostService} from './../auth/add-post.service';
import {PostPayload} from '../add-post/post-payload';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  providers: [
    AddPostService
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  public post!: PostPayload;
  public permaLink!: Number;
  public postTitle: string = '';
  public postAuthor: string = '';
  public postContent: string = '';
  public postImageUrl: string = '';

  constructor (
    private router: ActivatedRoute,
    private postService: AddPostService) {
  }

  ngOnInit () {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
      console.log("Post pedido: ",this.permaLink);
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
      this.postTitle = data.title;
      this.postAuthor = data.username;
      this.postContent = data.content;
      this.postImageUrl = data.imageurl;
    },(err: any) => {
      console.log('Failure Response: ', err);
    })
  }

}
