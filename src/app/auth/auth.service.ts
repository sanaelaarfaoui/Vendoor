import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthCoopData } from './auth-coop-data.model';
import { User } from './users.model';
import { Coop } from './coop.model';

@Injectable({providedIn: 'root'})
export class AuthService{
  private isAuthenticated = false;
  private token: string;
  private authStatusListener= new Subject<boolean>();
  private authTypeListener= new Subject<string>();
  private tokenTimer: any;
  private authType = "";
  private currId = null;

  public users_list:User[] = [];
  private users_listUpdated = new Subject<User[]>();
  private coops_list:Coop[] = [];
  private coops_listUpdated = new Subject<Coop[]>();

  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthType(){
    return this.authType;
  }

  getCurrId(){
    return this.currId;
  }


  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getAuthTypeListener(){
    return this.authTypeListener.asObservable();
  }

  createUser(username: string, email: string, firstname: string, lastname: string, password: string){
    const authData: AuthData = {username: username, email: email, firstname: firstname, lastname: lastname, password: password, type: false}
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
      });


  }

  createCoop(name: string, email: string, description: string, tel: string, address: string, password: string){
    const authCoopData: AuthCoopData = {
        name: name,
        email: email,
        description: description,
        image: "",
        address: address,
        tel: tel,
        password: password,
    }
    this.http.post("http://localhost:3000/api/coop/signup", authCoopData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/loginCoop']);
      });
  }

  login(email: string, password: string){
    if(email === "admin@test.com" && password === "admin"){
      this.currId = 0;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.authTypeListener.next("admin");
      this.router.navigate(['/admin/users']);
    }else{
      this.http.post<{currId: string, token: string, expiresIn: number}>("http://localhost:3000/api/user/login", {email: email, password: password})
      .subscribe(response => {
        this.currId = response.currId;
        const token = response.token;
        this.token = token;
        console.log(response);
        if(token){
          const expiresInDuration = response.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresInDuration * 1000);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.authTypeListener.next("user");
          this.router.navigate(['/']);
        }
      });
    }
  }

  loginCoop(email: string, password: string){
    this.http.post<{currId: string, token: string, expiresIn: number}>("http://localhost:3000/api/coop/login", {email: email, password: password})
      .subscribe(response => {
        this.currId = response.currId;
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresInDuration * 1000);
          this.isAuthenticated = true;
          this.authType = "coop";
          this.authStatusListener.next(true);
          this.authTypeListener.next("coop");
          this.router.navigate(['/coop/'+this.currId]);
        }
      });
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  getAllUsers(){
    this.http.get<{message: string, users: any}>("http://localhost:3000/api/user")
    .pipe(map((userData) => {
      return userData.users.map(user => {
        return {
          id: user._id,
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        };
      });
    }))
    .subscribe(transformedUser => {
      this.users_list = transformedUser;
      this.users_listUpdated.next([...this.users_list]);
    });
  }

  getUserUpdateListener(){
    return this.users_listUpdated.asObservable();
  }

  getAllCoops(){
    this.http.get<{message: string, coops: any}>("http://localhost:3000/api/coop")
    .pipe(map((coopData) => {
      return coopData.coops.map(coop => {
        return {
          id: coop._id,
          name: coop.name,
          email: coop.email,
          description: coop.description,
          address: coop.address,
          tel: coop.tel
        };
      });
    }))
    .subscribe(transformedCoop => {
      this.coops_list = transformedCoop;
      this.coops_listUpdated.next([...this.coops_list]);
    });
  }

  getCoopUpdateListener(){
    return this.coops_listUpdated.asObservable();
  }

  deleteUser(id: string){
    this.http.delete("http://localhost:3000/api/user/" + id)
      .subscribe(() => {
        console.log("Deleted");
        const updatedUsers = this.users_list.filter(user => user.id !== id);
        this.users_list = updatedUsers;
        this.users_listUpdated.next([...this.users_list]);
      });
  }

  deleteCoop(id: string){
    this.http.delete("http://localhost:3000/api/coop/" + id)
      .subscribe(() => {
        console.log("Deleted");
        const updatedProducts = this.coops_list.filter(coop => coop.id !== id);
        this.coops_list = updatedProducts;
        this.coops_listUpdated.next([...this.coops_list]);
      });
  }
}
