import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Coop } from './coop.model';

@Injectable({providedIn: 'root'})
export class CoopService{
  private coops: Coop[] = [];
  private coopsUpdated = new Subject<Coop[]>();
  private currCoop: Coop = null;
  constructor(private http: HttpClient, private router: Router){}


  getCoops() {
    this.http.get<{message: string, cooperatives: any}>('http://localhost:3000/api/coop')
      .pipe(map((coopData) => {
        console.log("hello");
        console.log(coopData.cooperatives);
        return coopData.cooperatives.map(coop => {
          return {
            id: coop._id,
            name: coop.name,
            email: coop.email,
            image: coop.image,
            description: coop.description,
            address: coop.address,
            tel: coop.tel
          };
        });
      }))
      .subscribe(transformedCoop => {
        this.coops = transformedCoop;
        this.coopsUpdated.next([...this.coops]);
      });
  }

  getCoopById(coopId: string) {
    return this.http.get<{_id: string, name: string, email: string, image: string, description: string, address: string, tel: string}>('http://localhost:3000/api/coop/' + coopId);
  }

  getCoopUpdateListener(){
    return this.coopsUpdated.asObservable();
  }
}
