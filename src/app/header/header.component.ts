import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { HeaderService } from './header.service';
import { Product } from '../products/product.model';
import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category.model';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated = false;
  authType = "";
  isAdmin = false;
  private authServiceSubs: Subscription;
  private authTypeSubs: Subscription;
  private authAdminSubs: Subscription;

  private headerServiceSubs: Subscription;
  numberInCard = 0;
  categories: Category[] = [];
  private catSub: Subscription;

  constructor(private authService: AuthService, private headerService: HeaderService, public adminService: AdminService, public categoriesService: CategoryService, public router: Router){}


  ngOnInit(){

    this.isAdmin = this.adminService.isAdmin();
    this.authAdminSubs = this.adminService
      .getAdminStatusListener()
      .subscribe(admin => {
        this.isAdmin = admin;
    });
    this.authServiceSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
    });

    this.authTypeSubs = this.authService
      .getAuthTypeListener()
      .subscribe(aType => {
        this.authType = aType;
      });

    this.headerServiceSubs = this.headerService
      .getCardStatusListener()
      .subscribe((cardProducts: Product[]) => {
        this.numberInCard = cardProducts.length;
      });

    this.categoriesService.getCategories();
    this.categoriesService.getCatUpdateListener()
      .subscribe((cats: Category[]) => {
        this.categories = cats;
      });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authServiceSubs.unsubscribe();
  }
}
