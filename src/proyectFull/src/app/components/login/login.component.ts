import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service'

import { Router } from '@angular/router';

import { User } from '../../User'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private router: Router) {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
    });
   }

  ngOnInit() {
  }

  verifyUser(form: NgForm){
    event.preventDefault();
    const users = this.users
    let value = false;
    users.forEach( (valor,indice) => {
      if(valor.email.localeCompare(form.value.email) == 0 && valor.password.localeCompare(form.value.password) == 0){
        value = true;
        localStorage.setItem( 'email', form.value.email);
        alert('Bienvenido');
        this.router.navigate(['/user-home']);
      }
    });
    if(!value){
      alert('Datos incorrectos');
    }
  }

}
