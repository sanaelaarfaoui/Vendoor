import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductsService } from 'src/app/products/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'category', 'coop','price','note', 'delete'];

  constructor(public productsService: ProductsService){}

  ngOnInit(){
    this.productsService.getProducts();
    this.productsService.getProductUpdateListener()
      .subscribe((prdcts: Product[]) => {
        this.products = prdcts;
      });
  }

  onDelete(id:string){
    this.productsService.deleteProduct(id);
  }
}
