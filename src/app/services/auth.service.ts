import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  getToken() {
    return localStorage.getItem('todo_token')
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('todo_token')
    return !!token
  }

  logout() {
    localStorage.removeItem('todo_token')
    this.router.navigate(['login'])
  }

}
