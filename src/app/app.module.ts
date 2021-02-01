import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule  } from '@angular/material/select';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { HeaderComponent } from './header/header.component'
import { ProductListComponent } from './products/product-list/product-list.component'
import { ProductsService } from './products/products.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthIntercecptor } from './auth/auth-interceptor';
import { SignupCoopComponent } from './auth/signupCoop/signupCoop.component';
import { LoginCoopComponent } from './auth/loginCoop/loginCoop.component';
import { CardListComponent } from './card/card-list/card-list.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { CoopListComponent } from './coop/coop-list/coop-list.component';
import { CoopInfoComponent } from './coop/coop-info/coop-info.component';
import { SearchListComponent } from './search/search-list/search-list.component';
import { SearchService } from './search/search.service';
import { CategoryService } from './categories/category.service';
import { AuthService } from './auth/auth.service';
import { HeaderService } from './header/header.service';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { HomeComponent } from './home/home.component';
import { CoopSpaceComponent } from './auth/coop-space/coop-space.component';
import { CommentAddComponent } from './comment/comment-add/comment-add.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { CheckoutComponent } from './card/checkout/checkout.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrdersService } from './orders/orders.service';
import { CommmentService } from './comment/comment.service';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminCoopComponent } from './admin/admin-coop/admin-coop.component';
import { AdminCommentComponent } from './admin/admin-comment/admin-comment.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponent,
    HeaderComponent,
    ProductListComponent,
    LoginComponent,
    SignupComponent,
    LoginCoopComponent,
    SignupCoopComponent,
    CardListComponent,
    CategoryListComponent,
    ProductInfoComponent,
    CoopListComponent,
    CoopInfoComponent,
    ProductInfoComponent,
    SearchListComponent,
    SearchBarComponent,
    HomeComponent,
    CoopSpaceComponent,
    CommentAddComponent,
    CommentListComponent,
    CheckoutComponent,
    OrdersListComponent,
    AdminUserComponent,
    AdminCoopComponent,
    AdminCommentComponent,
    AdminProductsComponent,
    AdminCategoryComponent,
    AdminOrdersComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatGridListModule,
    MatListModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [
    ProductsService,
    SearchService,
    CategoryService,
    AuthService,
    HeaderService,
    OrdersService,
    CommmentService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercecptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
