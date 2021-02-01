import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../products/product.model';

@Injectable({providedIn: 'root'})
export class HeaderService{
  cardProducts: Product[] = [];
  cardQuantity = [];
  private cardStatusListener= new Subject<Product[]>();
  private cardQteListener= new Subject<number[]>();


  getCard(){
    return {products: this.cardProducts, quantity: this.cardQuantity};
  }
  addProductToCard(product: Product){
    if (!this.cardProducts.some((item) => item.id == product.id)) {
      this.cardProducts.push(product);
      this.cardQuantity.push(1);
      this.cardStatusListener.next([...this.cardProducts]);
      this.cardQteListener.next([1]);
    }else{
      var i = this.cardProducts.findIndex(x => x.id === product.id);
      this.cardQuantity[i] = this.cardQuantity[i] + 1;
      this.cardStatusListener.next([...this.cardProducts]);
      this.cardQteListener.next(this.cardQuantity[i]);
    }
    console.log(this.cardProducts);
    console.log("this is the products in card : " + this.cardProducts);
    console.log("these are their quantities : " + this.cardQuantity);
  }

  addProductToCartWithQte(product: Product, qte: number){
    if (!this.cardProducts.some((item) => item.id == product.id)) {
      this.cardProducts.push(product);
      this.cardQuantity.push(qte);
      this.cardStatusListener.next([...this.cardProducts]);
      this.cardQteListener.next([1]);
    }else{
      var i = this.cardProducts.findIndex(x => x.id === product.id);
      this.cardQuantity[i] = this.cardQuantity[i] + qte;
      this.cardStatusListener.next([...this.cardProducts]);
      this.cardQteListener.next(this.cardQuantity[i]);
    }
    console.log(this.cardProducts);
    console.log("this is the products in card : " + this.cardProducts);
    console.log("these are their quantities : " + this.cardQuantity);
  }

  getCardStatusListener(){
    return this.cardStatusListener.asObservable();
  }

  getCardQteListener(){
    return this.cardQteListener.asObservable();
  }

  removeProductToCard(product: Product){
    /*
    if (!this.cardProducts.some((item) => item.id == product.id)) {
        this.cardProducts.push(product);
        this.cardQuantity.push(1);
    }else{
      var i = this.cardProducts.findIndex(x => x.id === product.id);
      this.cardQuantity[i] = this.cardQuantity[i] + 1;
    }
    console.log("this is the products in card : " + this.cardProducts);
    console.log("these are their quantities : " + this.cardQuantity);
    */
  }

  clearCart(){
    this.cardProducts = [];
    this.cardQuantity = [];
  }
}
