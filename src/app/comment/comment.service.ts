import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Comment } from './comment.model';

@Injectable({providedIn: 'root'})
export class CommmentService{

  private comments: Comment[] = [];
  private commentsUpdated = new Subject<Comment[]>();

  constructor(private http: HttpClient, private router: Router){}

  addComment(currId: string, productId:string, content:string){
    const comment: Comment = {
        id: null,
        productId: productId,
        userId: currId,
        content: content
      };
    console.log("readyy");
    this.http.post<{message: string, productId: string}>('http://localhost:3000/api/comment', comment)
      .subscribe((responseData) => {
        console.log("it is sent");
        console.log(responseData);
        const id = responseData.productId;
        comment.id = id;
        this.comments.push(comment);
        this.commentsUpdated.next([...this.comments]);
        //this.router.navigate(["/product/"+productId]);
      });
  }

  getComments(productId:string){
    //return this.http.get('http://localhost:3000/api/comment');
    this.http.get<{message: string, comments: any}>('http://localhost:3000/api/comment/' + productId)
      .pipe(map((commentData) => {
        return commentData.comments.map(comment => {
          return {
            id: comment._id,
            productId: comment.productId,
            userId: comment.userId,
            content: comment.content
          };
        });
      }))
      .subscribe(transformedComments => {
        this.comments = transformedComments;
        this.commentsUpdated.next([...this.comments]);
      });
  }

  getCommentsList(){
    return this.comments;
  }

  getAllComments(){
    this.http.get<{message: string, comments: any}>('http://localhost:3000/api/comment')
      .pipe(map((commentData) => {
        return commentData.comments.map(comment => {
          return {
            id: comment._id,
            productId: comment.productId,
            userId: comment.userId,
            content: comment.content
          };
        });
      }))
      .subscribe(transformedComments => {
        this.comments = transformedComments;
        this.commentsUpdated.next([...this.comments]);
      });
  }

  getCommentUpdateListener(){
    return this.commentsUpdated.asObservable();
  }

  deleteComment(id: string){
    this.http.delete("http://localhost:3000/api/comment/" + id)
      .subscribe(() => {
        console.log("Deleted");
        const updatedComms = this.comments.filter(comment => comment.id !== id);
        this.comments = updatedComms;
        this.commentsUpdated.next([...this.comments]);
      });
  }
}
