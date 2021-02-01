import { Component, OnInit, OnDestroy } from '@angular/core';
import { Coop } from '../coop.model';
import { Subscription } from 'rxjs';
import { CoopService } from '../coop.service';
import { Route } from '@angular/compiler/src/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { ProductsService } from 'src/app/products/products.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HeaderService } from 'src/app/header/header.service';

@Component({
  selector: 'app-coop-info',
  templateUrl: './coop-info.component.html',
  styleUrls: ['./coop-info.component.css']
})
export class CoopInfoComponent implements OnInit, OnDestroy{
  coop: Coop;
  isLoading = false;
  private catSub: Subscription;
  private authStatusSub: Subscription;
  private authTypeSub: Subscription;
  userIsAuthenticated = false;
  authType = "";
  coopId = "";
  private mode = "";
  coopProducts: Product[] = [];
  currCoopId = null;

  constructor(public coopsService: CoopService, public productsService: ProductsService, private authService: AuthService, public headerService: HeaderService, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.mode = "id";
        this.coopId = paramMap.get('id');
        if(this.mode === "id"){
          this.coopsService.getCoopById(this.coopId)
            .subscribe(coopData => {
              this.coop = {
                id: coopData._id,
                name: coopData.name,
                email: coopData.email,
                image: coopData.image,
                description: coopData.description,
                address: coopData.address,
                tel: coopData.tel
              }
            });
            this.productsService.getProductsByCoop(this.coopId);
            this.productsService.getProductUpdateListener()
              .subscribe((products: Product[]) => {
                console.log(products);
                this.coopProducts = products;
                this.isLoading = false;
              });
        }
      }
    });
    this.isLoading = true;


    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authType = this.authService.getAuthType();
    if(this.authService.getCurrId()){
      this.currCoopId = this.authService.getCurrId();
    }
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

  onDelete(productId: string){
    this.productsService.deleteProduct(productId);
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
