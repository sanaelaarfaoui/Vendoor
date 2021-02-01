import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/users.model';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit{
  users: User[] = [];
  displayedColumns: string[] = ['id', 'email', 'firstname', 'lastname','delete'];

  constructor(public authService: AuthService){}

  ngOnInit(){
    this.authService.getAllUsers();
    this.authService.getUserUpdateListener()
      .subscribe((usrs: User[]) => {
        this.users = usrs;
      });
  }

  onDelete(id:string){
    this.authService.deleteUser(id);
  }
}
