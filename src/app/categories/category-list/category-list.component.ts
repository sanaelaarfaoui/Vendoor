import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  categories: Category[] = [];
  isLoading = false;
  private catSub: Subscription;

  constructor(public categoriesService: CategoryService) {}

  ngOnInit(){
    this.isLoading = true;
    this.categoriesService.getCategories();
    this.categoriesService.getCatUpdateListener()
      .subscribe((cats: Category[]) => {
        this.categories = cats;
        this.isLoading = false;
      });
  }
}
