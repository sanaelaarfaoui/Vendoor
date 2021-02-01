import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
class ProductsService{
  private products: Product[] = [];
  private productBtId: Product = null;
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router){}


  getProducts() {
    this.http.get<{message: string, products: any}>('http://localhost:3000/api/products')
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
      .subscribe(transformedProducts => {
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
      });
  }

  getProductsByCat(catName: string) {
    this.http.get<{message: string, products: any}>('http://localhost:3000/api/products/cat/' + catName)
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
      .subscribe(transformedProducts => {
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
      });
  }

  getProductsById(productId: string) {
    return this.http.get<{_id: string, name: string, coop: string, description: string, category: string, image: string, price: number, note: number}>('http://localhost:3000/api/products/' + productId);
  }

  getProductsByCoop(coopId: string) {
    this.http.get<{message: string, products: any}>('http://localhost:3000/api/products/coop/' + coopId)
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
      .subscribe(transformedProducts => {
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
      });
  }

  getProductUpdateListener(){
    return this.productsUpdated.asObservable();
  }

  getOneProductUpdateListener(){
    return this.productsUpdated.asObservable();
  }

  addProduct(name: string, description: string, category: string, image:string, price: number){
    const product: Product = {
        id: null,
        name: name,
        coop: null,
        description: description,
        category : category,
        image: image,
        price: price,
        note: 0
      };
    console.log("ready to send");
    this.http.post<{message: string, productId: string}>('http://localhost:3000/api/products', product)
      .subscribe((responseData) => {
        console.log("sent");
        console.log(responseData);
        const id = responseData.productId;
        product.id = id;
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
        this.router.navigate(["/"]);
      });
  }

  deleteProduct(productId: string){
    this.http.delete("http://localhost:3000/api/products/" + productId)
      .subscribe(() => {
        console.log("Deleted");
        const updatedProducts = this.products.filter(product => product.id !== productId);
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
      });
  }
}

export {ProductsService}
