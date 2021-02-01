import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit{
  products: Product[] = [];
  isLoading = false;
  private searchSub: Subscription;

  constructor(public searchService: SearchService) {}

  ngOnInit(){
    /*this.isLoading = true;
    this.categoriesService.getCategories();
    this.categoriesService.getCatUpdateListener()
      .subscribe((cats: Category[]) => {
        this.categories = cats;
        this.isLoading = false;
      });*/
  }
}
