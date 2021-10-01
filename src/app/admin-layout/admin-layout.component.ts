import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const redirect = window.open('https://small-todo.herokuapp.com/admin/')
    if (!redirect) this._snackBar.open('Браузер не разрешил переход. Для доступа в панель администратора перейдите по ссылке https://small-todo.herokuapp.com/admin/')
    this.router.navigate([''])
  }

}
