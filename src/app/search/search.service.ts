import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../products/product.model';

@Injectable({providedIn: 'root'})
export class SearchService{
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router){}


  getProducts(query: string) {
    this.http.get<{message: string, products: any}>('http://localhost:3000/api/products/s/' + query)
      .pipe(map((productData) => {
        return productData.products.map(product => {
          return {
            id: product._id,
            name: product.name,
            coop: product.coop,
            description: product.description,
            category : product.category,
            image: product.image,
            price: product.price,
            note: product.note
          };
        });
      }))
      .subscribe(transformedCat => {
        this.products = transformedCat;
        this.productsUpdated.next([...this.products]);
      });
    this.router.navigate(["/search/" + query]);
  }

  getProductUpdateListener(){
    return this.productsUpdated.asObservable();
  }
}
