import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() {
    return localStorage.getItem('todo_token')
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('todo_token')
    return !!token
  }
}
