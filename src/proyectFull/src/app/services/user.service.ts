import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from "rxjs/operators";

import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  domain: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${this.domain}/api/users`)
    .pipe(map(res => res));
  }

  addUser(newUser: User) {
    return this.http.post<User>(`${this.domain}/api/users`, newUser)
    .pipe(map(res => res));
  }

  deleteUser(id) {
    return this.http.delete(`${this.domain}/api/users/${id}`)
    .pipe(map(res => res));
  }

  updateUser(newUser) {
    return this.http.put(`${this.domain}/api/users/${newUser.id}`, newUser)
    .pipe(map(res => res));
  }



}
