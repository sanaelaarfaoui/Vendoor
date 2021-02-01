import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HeaderService } from '../../header/header.service';
import { Product } from '../../products/product.model';
import { Subscription } from 'rxjs';
import { OrderProduct } from '../orderproduct.model';
import { OrdersService } from '../orders.service';
import { Order } from 'src/app/card/order.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ProductsService } from 'src/app/products/products.service';

@Component({
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'qte', 'fullname', 'address'];
  isLoading = false;
  orderProducts: OrderProduct[] = [];
  private authTypeSubs: Subscription;
  private headerServiceSubs: Subscription;
  currId: string=  null;

  constructor(private authService: AuthService, private headerService: HeaderService, private ordersService: OrdersService, private productsService: ProductsService){}

  ngOnInit(){
      this.isLoading = true;
      this.currId = this.authService.getCurrId();
      this.ordersService.getOrders(this.currId)
      this.ordersService.getOrderProductUpdateListener()
        .subscribe((oProducts: OrderProduct[]) =>{
          this.orderProducts = oProducts;
          this.isLoading = false;
        })
  }
}
