import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CommmentService } from 'src/app/comment/comment.service';
import { Comment } from 'src/app/comment/comment.model';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.css']
})
export class AdminCommentComponent{
  comments: Comment[] = [];
  displayedColumns: string[] = ['id', 'productId', 'userId', 'content','delete'];

  constructor(public commentsService: CommmentService){}

  ngOnInit(){
    this.commentsService.getAllComments();
    this.commentsService.getCommentUpdateListener()
      .subscribe(comms => {
        this.comments = comms;
      });
  }

  onDelete(id:string){
    this.commentsService.deleteComment(id);
  }
}
