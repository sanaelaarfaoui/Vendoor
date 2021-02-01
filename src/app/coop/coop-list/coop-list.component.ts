import { Component, OnInit } from '@angular/core';
import { Coop } from '../../auth/coop.model';
import { Subscription } from 'rxjs';
import { CoopService } from '../coop.service';
import { Route } from '@angular/compiler/src/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-coop-list',
  templateUrl: './coop-list.component.html',
  styleUrls: ['./coop-list.component.css']
})
export class CoopListComponent implements OnInit{
  coops: Coop[] = [];
  displayedColumns: string[] = ['name'];

  constructor(public authService: AuthService){}

  ngOnInit(){
    this.authService.getAllCoops();
    this.authService.getCoopUpdateListener()
      .subscribe((co: Coop[]) => {
        this.coops = co;
      });
  }

  onDelete(id:string){
    this.authService.deleteCoop(id);
  }
}
