import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { SearchService } from '../search.service';
import { NgForm } from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{
  // clicks
  isFocusInsideComponent = false;
  isComponentClicked = false;
  // params
  products: Product[] = [];
  isLoading = false;
  private searchSub: Subscription;
  enteredValue = "";


  constructor(public searchService: SearchService, public router: Router, public route: ActivatedRoute) {}

  ngOnInit(){
    if(this.router.url.split("/")[1] === 'search'){
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('q')){
          this.searchService.getProducts(paramMap.get('q'));
          this.enteredValue == paramMap.get('q');
        }
      });
    }
  }

  updateResult(form: NgForm){
    console.log(this.enteredValue);
    //this.isLoading = true;
    if(form.invalid){
      return;
      this.isLoading = false;
    }
    if(form.value.q !== ""){
      this.searchService.getProducts(form.value.q);
      this.enteredValue = form.value.q;
    }

  }

  goToSearch(){
    if(this.router.url.split("/")[1] !== 'search'){
      this.router.navigate(["/search/ "]);
    }

  }

  @HostListener('click')
  clickInside() {
      this.isFocusInsideComponent = true;
      this.isComponentClicked = true;
  }


  @HostListener('document:click')
  clickout() {
    if (!this.isFocusInsideComponent && this.isComponentClicked) {
        if(this.enteredValue == ""){
          this.router.navigate(["/"]);
        }

        this.isComponentClicked = false;
    }
    this.isFocusInsideComponent = false;
  }
}
