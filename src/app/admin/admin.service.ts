import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products/products.service';
import { AuthService } from '../auth/auth.service';
import { CommmentService } from '../comment/comment.service';
import { CategoryService } from '../categories/category.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AdminService{
  private adminLogged = false;
  private adminStatusListener= new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router){}

  ifNotLogged(){
    if(!this.adminLogged){
      this.router.navigate(['/admin/home']);
    }
  }

  isAdmin(){
    return this.adminLogged;
  }

  logAdmin(){
    this.adminLogged = true;
    this.adminStatusListener.next(true);
  }

  getAdminStatusListener(){
    return this.adminStatusListener.asObservable();
  }



}
