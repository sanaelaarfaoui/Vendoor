import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CommmentService } from '../comment.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsService } from 'src/app/products/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls : ['./comment-add.component.css']
})
export class CommentAddComponent implements OnInit {
  isLoading = false;
  userIsAuthenticated = false;
  currUser = null;
  authType = "";
  productId = "";
  private authServiceSubs: Subscription;
  private authTypeSubs: Subscription;

  constructor(public authService: AuthService, public commentService: CommmentService, public productsService: ProductsService, public route: ActivatedRoute, public router: Router){}

  ngOnInit(){
    this.authTypeSubs = this.authService
      .getAuthTypeListener()
      .subscribe(aType => {
        this.authType = aType;
      });
    this.currUser = this.authService.getCurrId();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.productId = paramMap.get('id');
      }
    });
  }


  onAddComment(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.currUser){
      console.log("okaay");
      this.commentService.addComment(this.currUser, this.productId, form.value.content);
      this.isLoading = false;
      form.reset();
      //this.router.navigate(['/product/'+this.productId]);
    }
  }
}
