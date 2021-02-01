import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  templateUrl: './coop-space.component.html',
})
export class CoopSpaceComponent {
  isLoading = false;

  constructor(public authService: AuthService){}

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createCoop(form.value.name, form.value.email, form.value.description, form.value.address, form.value.tel, form.value.password);
  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.loginCoop(form.value.email, form.value.password);
  }
}
