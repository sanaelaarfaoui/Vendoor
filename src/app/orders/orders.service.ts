import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { OrderProduct } from './orderproduct.model';
import { Order } from '../card/order.model';
import { Product } from '../products/product.model';

@Injectable({providedIn: 'root'})
export class OrdersService{
  private orders: Order[] = [];
  private orderProducts: OrderProduct[] = [];
  private ordersUpdated = new Subject<Order[]>();
  private orderProductsUpdated = new Subject<OrderProduct[]>();

  constructor(private http: HttpClient, private router: Router){}


  getOrders(coopId: string) {
    this.orders = [];
    this.orderProducts = [];
    this.http.get<{message: string, orders: any}>('http://localhost:3000/api/order')
      .pipe(map((orderData) => {
        console.log("in");
        console.log(orderData);
        return orderData.orders.map(order => {
          return {
            id: order._id,
            userId: order.userId,
            fullname: order.fullname,
            address: order.address,
            tel: order.tel,
            products: order.products,
            qte: order.qte,
            money: order.money,
            done: order.done
          };
        });
      }))
      .subscribe(transformedOrders => {
        this.orders = transformedOrders;
        this.ordersUpdated.next([...this.orders]);
        for(let i = 0; i<this.orders.length; i++){
          for(let j = 0; j< this.orders[i].products.length;j++){
            var product: Product = <Product>this.orders[i].products[j];
            if(product.coop == coopId){
              var orderProduct: OrderProduct = {
                idOrder: this.orders[i].id,
                idCoop: product.coop,
                productName: product.name,
                idProduct: product.id,
                qteProduct: this.orders[i].qte[j],
                fullname: this.orders[i].fullname,
                address: this.orders[i].address
              }
              this.orderProducts.push(orderProduct);
            }
          }
        }
        this.orderProductsUpdated.next([...this.orderProducts]);
      });
      console.log("out");
      console.log(this.orders);
  }

  getAllOrders() {
    this.orders = [];
    this.orderProducts = [];
    this.http.get<{message: string, orders: any}>('http://localhost:3000/api/order')
      .pipe(map((orderData) => {
        console.log("in");
        console.log(orderData);
        return orderData.orders.map(order => {
          return {
            id: order._id,
            userId: order.userId,
            fullname: order.fullname,
            address: order.address,
            tel: order.tel,
            products: order.products,
            qte: order.qte,
            money: order.money,
            done: order.done
          };
        });
      }))
      .subscribe(transformedOrders => {
        this.orders = transformedOrders;
        this.ordersUpdated.next([...this.orders]);
        for(let i = 0; i<this.orders.length; i++){
          for(let j = 0; j< this.orders[i].products.length;j++){
            var product: Product = <Product>this.orders[i].products[j];
            var orderProduct: OrderProduct = {
              idOrder: this.orders[i].id,
              idCoop: product.coop,
              productName: product.name,
              idProduct: product.id,
              qteProduct: this.orders[i].qte[j],
              fullname: this.orders[i].fullname,
              address: this.orders[i].address
            }
            this.orderProducts.push(orderProduct);
          }
        }
        this.orderProductsUpdated.next([...this.orderProducts]);
      });
      console.log("out");
      console.log(this.orders);
  }

  getOrderUpdateListener(){
    return this.ordersUpdated.asObservable();
  }

  getOrderProductUpdateListener(){
    return this.orderProductsUpdated.asObservable();
  }
}
