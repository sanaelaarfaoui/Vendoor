import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category.model';
import { SearchService } from '../search/search.service';
import { query } from '@angular/animations';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{
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
  categories: Category[] = [];
  private catSub: Subscription;
  currRoute = "";

  constructor(public productsService: ProductsService, private authService: AuthService, private headerService: HeaderService, public route: ActivatedRoute, public categoriesService: CategoryService, private router: Router, public searchService: SearchService) {}

  onDelete(productId: string){
    this.productsService.deleteProduct(productId);
  }

  ngOnInit(){
    this.currRoute = this.router.url;
    this.isLoading = true;
    this.categoriesService.getCategories();
    this.categoriesService.getCatUpdateListener()
      .subscribe((cats: Category[]) => {
        this.categories = cats;
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('cat')){
        this.mode = "cat";
        this.catName = paramMap.get('cat');
      }else if(paramMap.has('coop')){
        this.mode = "coop";
        this.coopId = paramMap.get('coop');
      }
      else{
        this.mode = "all";
        this.catName = null;
      }
    });
    this.isLoading = true;

    if(this.currRoute === "/"){
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
            console.log(products);
            this.products = products;
            this.isLoading = false;
          });
      }else if(this.mode == "coop"){
        this.productsService.getProductsByCoop(this.coopId);
        this.productsService.getProductUpdateListener()
          .subscribe((products: Product[]) => {
            console.log(products);
            this.products = products;
            this.isLoading = false;
          });
      }
    }else if(this.currRoute.split("/")[1] === "search"){
      this.searchService.getProductUpdateListener()
          .subscribe((products: Product[]) => {
            console.log(products);
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
