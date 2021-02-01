import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy{
  products: Product[] = []
  private productSub: Subscription;
  isLoading = false;
  private authStatusSub: Subscription;
  private authTypeSub: Subscription;
  userIsAuthenticated = false;
  authType = "";
  private mode = "all";
  private catName = "";
  private coopId = "";

  constructor(public productsService: ProductsService, private authService: AuthService, private headerService: HeaderService, public route: ActivatedRoute) {}

  onDelete(productId: string){
    this.productsService.deleteProduct(productId);
  }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('cat')){
        this.mode = "cat";
        this.catName = paramMap.get('cat');
      }else if(paramMap.has('coop')){
        this.mode = "coop";
        this.coopId = paramMap.get('coop');
      }
      else{
        console.log("2");
        this.mode = "all";
        this.catName = null;
      }
    });
    this.isLoading = true;


    if(this.mode == "all"){
      this.productsService.getProducts();
      this.productsService.getProductUpdateListener()
        .subscribe((products: Product[]) => {
          this.products = products;
          this.isLoading = false;
        });
    }else if(this.mode == "cat"){
      this.productsService.getProductsByCat(this.catName);
      this.productsService.getProductUpdateListener()
        .subscribe((products: Product[]) => {
          this.products = products;
          this.isLoading = false;
        });
    }else if(this.mode == "coop"){
      this.productsService.getProductsByCoop(this.coopId);
      this.productsService.getProductUpdateListener()
        .subscribe((products: Product[]) => {
          this.products = products;
          this.isLoading = false;
        });
    }
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authType = this.authService.getAuthType();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.authTypeSub = this.authService
      .getAuthTypeListener()
      .subscribe(aType => {
        console.log("authType = " + aType);
        this.authType = aType;
      });

  }

  addToCard(product: Product){
    this.headerService.addProductToCard(product);
  }

  ngOnDestroy(){
    if(this.productSub){
      this.productSub.unsubscribe();
    }
    this.authStatusSub.unsubscribe();
  }

}
