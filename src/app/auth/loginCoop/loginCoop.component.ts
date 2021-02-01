import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-coop',
  templateUrl: './loginCoop.component.html',
  styleUrls : ['./loginCoop.component.css']
})
export class LoginCoopComponent {
  isLoading = false;

  constructor(public authService: AuthService){}

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.loginCoop(form.value.email, form.value.password);
  }
}
