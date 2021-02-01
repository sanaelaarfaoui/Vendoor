import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginCoopComponent } from './auth/loginCoop/loginCoop.component';
import { SignupCoopComponent } from './auth/signupCoop/signupCoop.component';
import { CardListComponent } from './card/card-list/card-list.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CoopListComponent } from './coop/coop-list/coop-list.component';
import { CoopInfoComponent } from './coop/coop-info/coop-info.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { HomeComponent } from './home/home.component';
import { CoopSpaceComponent } from './auth/coop-space/coop-space.component';
import { CheckoutComponent } from './card/checkout/checkout.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminCoopComponent } from './admin/admin-coop/admin-coop.component';
import { AdminCommentComponent } from './admin/admin-comment/admin-comment.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';



const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: '', component: ProductListComponent },
  {path: 'create', component: ProductCreateComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'loginCoop', component: LoginCoopComponent },
  {path: 'signupCoop', component: SignupCoopComponent },
  {path: 'logout', component: SignupComponent },
  {path: 'category', component: CategoryListComponent },
  {path: 'category/:cat', component: ProductListComponent },
  {path: 'product/:id', component: ProductInfoComponent },
  {path: 'c', component: CoopListComponent },
  {path: 'coop/:id', component: CoopInfoComponent },
  {path: 'card', component: CardListComponent },
  {path: 'search/:q', component: HomeComponent },
  {path: 'search', component: HomeComponent },
  {path: 'coopList', component: CoopListComponent },
  {path: 'checkout', component: CheckoutComponent },
  {path: 'orders', component: OrdersListComponent },
  {path: 'admin/users', component: AdminUserComponent },
  {path: 'admin/coops', component: AdminCoopComponent },
  {path: 'admin/comments', component: AdminCommentComponent },
  {path: 'admin/products', component: AdminProductsComponent },
  {path: 'admin/categories', component: AdminCategoryComponent },
  {path: 'admin/orders', component: AdminOrdersComponent },
  {path: 'Contact', component: ContactComponent },
  {path: 'AboutUs', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
