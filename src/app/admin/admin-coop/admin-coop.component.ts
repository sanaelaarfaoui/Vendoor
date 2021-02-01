import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Coop } from 'src/app/auth/coop.model';

@Component({
  selector: 'app-admin-coop',
  templateUrl: './admin-coop.component.html',
  styleUrls: ['./admin-coop.component.css']
})
export class AdminCoopComponent implements OnInit{
  coops: Coop[] = [];
  displayedColumns: string[] = ['id','name' ,'email', 'delete'];

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
