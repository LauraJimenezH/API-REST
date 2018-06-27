import { Injectable } from '@angular/core';

import { map } from "rxjs/operators";

import { Proyect } from '../Proyect'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {
  domain: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getProyects() {
    return this.http.get<Proyect[]>(`${this.domain}/api/proyects`)
    .pipe(map(res => res));
  }

  addProyect(newProyect: Proyect) {
    return this.http.post<Proyect>(`${this.domain}/api/proyects`, newProyect)
    .pipe(map(res => res));
  }

  deleteProyect(id) {
    return this.http.delete<Proyect>(`${this.domain}/api/proyects/${id}`)
    .pipe(map(res => res)) 
  }

}
