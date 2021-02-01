import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { ProductsService } from 'src/app/products/products.service';
import { AuthService } from 'src/app/auth/auth.service';
import { OrdersService } from 'src/app/orders/orders.service';
import { Order } from 'src/app/card/order.model';
import { OrderProduct } from 'src/app/orders/orderproduct.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit{
  orders: Order[] = [];
  orderProducts: OrderProduct[];
  displayedColumns: string[] = ['id','userId', 'products' ,'price'];

  constructor(public authService: AuthService, public orderService: OrdersService){}

  ngOnInit(){
    this.orderService.getAllOrders();
    this.orderService.getOrderUpdateListener()
      .subscribe((ordrs: Order[]) => {
        this.orders = ordrs;
      });
    this.orderService.getOrderProductUpdateListener()
      .subscribe((orders: OrderProduct[]) => {
        this.orderProducts = orders;
        console.log("the products are : ");
        console.log(orders);
      });
  }
}
