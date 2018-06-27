import { Component, OnInit } from '@angular/core';

import { ProyectService } from '../../services/proyect.service';
import { Proyect } from '../../Proyect';
import { UserService } from '../../services/user.service';
import { User } from '../../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  proyects: Proyect[];
  title: string;
  cliente: string;
  description: string;
  fechainicio: string;
  fechafin: string;
  usuario: string;

  constructor(private proyectService: ProyectService, private userService: UserService, private router: Router) {
    this.proyectService.getProyects()
      .subscribe(proyects => {
        this.proyects = proyects
    })
  }

  ngOnInit() {
  }

  addProyect(event) {
    event.preventDefault();
    console.log(this.proyects)
    const newProyect: Proyect = {
      title: this.title,
      cliente: this.cliente,
      description: this.description,
      fechainicio: this.fechainicio,
      fechafin: this.fechafin,
      usuario: localStorage.getItem('email')
    };  
    this.proyectService.addProyect(newProyect)
      .subscribe(proyect => {
        this.proyects.push(proyect);
        
        this.title = '';
        this.cliente = '';
        this.description = '';
        this.fechainicio = '';
        this.fechafin = '';
        this.usuario = localStorage.getItem('email');
      })
  }

  deleteProyect(id) {
    const response = confirm('are you sure to delete it?')
    if(response) {
      const proyects = this.proyects;
    this.proyectService.deleteProyect(id)
     .subscribe(data => {
       if(data.n == 1) {
        this.proyects = this.proyects.filter(t => t._id !== id)
       }
     })
    }
    return;
  }

  logout() {
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  

}
