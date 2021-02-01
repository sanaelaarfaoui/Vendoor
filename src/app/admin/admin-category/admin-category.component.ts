import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CommmentService } from 'src/app/comment/comment.service';
import { Comment } from 'src/app/comment/comment.model';
import { CategoryService } from 'src/app/categories/category.service';
import { Category } from 'src/app/categories/category.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent{
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'delete'];

  constructor(public categoryService: CategoryService){}

  ngOnInit(){
    this.categoryService.getCategories();
    this.categoryService.getCatUpdateListener()
      .subscribe(cats => {
        this.categories = cats;
      });
  }

  onDelete(id:string){
    this.categoryService.deleteCategory(id);
  }

  onAddCat(form: NgForm){
    if(form.invalid){
      return;
    }
    this.categoryService.addCategory(form.value.name);
  }
}
