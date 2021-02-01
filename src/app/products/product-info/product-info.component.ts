import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductsService } from '../products.service';
import { HeaderService } from 'src/app/header/header.service';
import { CoopService } from 'src/app/coop/coop.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})

export class ProductInfoComponent implements OnInit{
  product: Product;
  private productSub: Subscription;
  isLoading = false;
  private authStatusSub: Subscription;
  private authTypeSub: Subscription;
  userIsAuthenticated = false;
  authType = "";
  private mode = "";
  private productId = "";
  qte = 1;
  coopName= "";

  constructor(public productsService: ProductsService, private authService: AuthService, private headerService: HeaderService,public coopService:CoopService ,public route: ActivatedRoute) {}

  ngOnInit(){

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.productId = paramMap.get('id');

        this.productsService.getProductsById(this.productId)
        .subscribe(productData => {
          this.product = {
            id: productData._id,
            name: productData.name,
            coop: productData.coop,
            description: productData.description,
            category : productData.category,
            image: productData.image,
            price: productData.price,
            note: productData.note
          }
          this.coopName = this.getCoopNameFromId(productData._id);
        });
      }

    });
    this.coopService.getCoopById(this.product.coop);
    this.isLoading = true;
  }

  addToCart(product: Product, qte: number){
    this.headerService.addProductToCartWithQte(product, qte);
  }

  getCoopNameFromId(id:string){
    let name = "";
    this.coopService.getCoopById(id)
      .subscribe(coopData => {
        name=coopData.name;
        console.log("naame");
        console.log(coopData.name);
      });

    return name;
  }
}
