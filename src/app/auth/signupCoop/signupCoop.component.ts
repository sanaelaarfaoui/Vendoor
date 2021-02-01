import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-coop',
  templateUrl: './signupCoop.component.html',
  styleUrls : ['./signupCoop.component.css']
})
export class SignupCoopComponent {
  isLoading = false;

  constructor(public authService: AuthService){}

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createCoop(form.value.name, form.value.email, form.value.description, form.value.address, form.value.tel, form.value.password);
  }
}
