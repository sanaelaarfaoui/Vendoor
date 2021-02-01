import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploadService } from './file-upload.service';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent implements OnInit{
  enteredTitle = '';
  enteredContent = '';
  selectedFile: File
  fd = new FormData();
  isLoading = false;
  categories: Category[] = []

  constructor(private http: HttpClient, public productsService: ProductsService, public categoryService:CategoryService ,public route: ActivatedRoute, public fileUploadService:FileUploadService){}

  ngOnInit(){
    this.categoryService.getCategories();
    this.categoryService.getCatUpdateListener()
      .subscribe((cats: Category[]) => {
        this.categories = cats;
      });
  }


  onAddProduct(form: NgForm){
    this.isLoading = true;
    if(form.invalid){
      return;
      this.isLoading = false;
    }
    this.productsService.addProduct(form.value.name, form.value.description, form.value.category, form.value.image, form.value.price);
    form.resetForm();
  }
}
