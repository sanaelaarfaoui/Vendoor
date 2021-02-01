import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HeaderService } from 'src/app/header/header.service';
import { Product } from 'src/app/products/product.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../order.model';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  isLoading = false;
  cardProducts: Product[] = [];
  cardQuantity: number[] = [];
  prixTotal: number = 0;
  private authTypeSubs: Subscription;
  private headerServiceSubs: Subscription;
  currId: string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private headerService: HeaderService){}

  ngOnInit(){
    this.cardProducts = this.headerService.getCard().products;
    this.cardQuantity = this.headerService.getCard().quantity;

    this.headerServiceSubs = this.headerService
      .getCardStatusListener()
      .subscribe((cardP: Product[]) => {
        this.cardProducts = cardP;
      });

    this.headerServiceSubs = this.headerService
      .getCardQteListener()
      .subscribe((cardQte: number[]) => {
        this.cardQuantity = cardQte;
      });

      for (let i = 0; i < this.cardProducts.length; i++) {
        this.prixTotal = this.prixTotal + this.cardProducts[i].price*this.cardQuantity[i];
      }

      this.currId = this.authService.getCurrId();

  }

  checkout(form: NgForm){
    this.isLoading = true;
    if(form.invalid){
      return;
      this.isLoading = false;
    }
    const order: Order = {
      id: null,
      userId: this.currId,
      fullname: form.value.fullname,
      address: form.value.address,
      tel: form.value.tel,
      products: this.cardProducts,
      qte: this.cardQuantity,
      money: this.prixTotal,
      done: false
    }
    this.http.post("http://localhost:3000/api/order", order)
      .subscribe(response => {
        console.log(response);
        this.cardProducts = [];
        this.cardProducts = [];
        this.prixTotal = 0;
        this.headerService.clearCart();
        this.router.navigate(['/']);
      });
    form.resetForm();
  }

}
