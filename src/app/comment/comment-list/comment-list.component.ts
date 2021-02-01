import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { CommmentService } from '../comment.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls : ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit{
  comments: Comment[] = [];
  private productSub: Subscription;
  isLoading = false;
  private authStatusSub: Subscription;
  private authTypeSub: Subscription;
  userIsAuthenticated = false;
  authType = "";
  productId = null;
  private mode = "all";
  private catName = "";
  private coopId = "";

  constructor(private authService: AuthService, private commentsService: CommmentService, public route: ActivatedRoute) {}


  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.productId = paramMap.get('id');
      }
    });
    this.commentsService.getComments(this.productId);
    this.commentsService.getCommentUpdateListener()
      .subscribe(comms => {
        this.comments = comms;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.authTypeSub = this.authService
      .getAuthTypeListener()
      .subscribe(aType => {
        this.authType = aType;
      });

  }

}
