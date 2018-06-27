import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service'

import { User } from '../../User'
import { Proyect } from '../../Proyect';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: User[];
  email: string;
  password: string;

  constructor(private userService: UserService,private router: Router) { 
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit() {
  }

  addUser(event){
    event.preventDefault();
    const newUser: User = {
      email: this.email,
      password: this.password
    };
    this.userService.addUser(newUser)
    .subscribe(user => {
      this.users.push(user);
      console.log(this.users);
    });
    localStorage.setItem( 'email', this.email);
    alert('Registrado con exito!')
    this.router.navigate(['/user-home']);
  }

}
