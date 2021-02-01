import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from './category.model';

@Injectable({providedIn: 'root'})
export class CategoryService{
  private categories: Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();

  constructor(private http: HttpClient, private router: Router){}


  getCategories() {
    this.http.get<{message: string, categories: any}>('http://localhost:3000/api/category')
      .pipe(map((catData) => {
        return catData.categories.map(cat => {
          return {
            id: cat._id,
            name: cat.name,
          };
        });
      }))
      .subscribe(transformedCat => {
        this.categories = transformedCat;
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  getCatUpdateListener(){
    return this.categoriesUpdated.asObservable();
  }

  deleteCategory(id: string){
    this.http.delete("http://localhost:3000/api/category/" + id)
      .subscribe(() => {
        console.log("Deleted");
        const updatedComms = this.categories.filter(category => category.id !== id);
        this.categories = updatedComms;
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  addCategory(name: string){
    this.http.post("http://localhost:3000/api/category", {name:name})
      .subscribe(response => {
        console.log(response);
      });
  }
}
