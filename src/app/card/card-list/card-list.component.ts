import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HeaderService } from 'src/app/header/header.service';
import { Product } from 'src/app/products/product.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit{
  isLoading = false;
  cardProducts: Product[] = [];
  cardQuantity: number[] = [];
  prixTotal: number = 0;
  private authTypeSubs: Subscription;
  private headerServiceSubs: Subscription;

  constructor(private authService: AuthService, private headerService: HeaderService){}

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

      this.countTotal();

  }
  onAdd(i:number){
    this.cardQuantity[i] = this.cardQuantity[i] + 1;
    this.countTotal();
  }
  onRemove(i:number){
    if(this.cardQuantity[i] == 1){
      this.cardQuantity.splice(i, 1);
      this.cardProducts.splice(i, 1);
    }else{
      this.cardQuantity[i] = this.cardQuantity[i] - 1;
    }
    this.countTotal();
  }
  onDelete(i:number){
    this.cardQuantity.splice(i, 1);
    this.cardProducts.splice(i, 1);
    this.countTotal();
  }

  countTotal(){
    this.prixTotal = 0;
    for (let i = 0; i < this.cardProducts.length; i++) {
      this.prixTotal = this.prixTotal + this.cardProducts[i].price*this.cardQuantity[i];
    }
  }
}
