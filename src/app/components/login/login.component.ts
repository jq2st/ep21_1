import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('tabGroupRef') tabGroupRef!: MatTabGroup
  form: FormGroup

  constructor(private api: ApiService, private router: Router, private _snackBar: MatSnackBar) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.api.login(this.form.value)
      .subscribe((res: any) => {
        localStorage.setItem('todo_token', res.access_token)
        this.router.navigate([''])
        this.openSnackBar('Вход выполнен', 'OK')
      },
      (error: any) => {
        this.openSnackBar('Неверные данные', 'OK')
      })

  }

  registration(formDirective: any) {
    this.api.registration(this.form.value)
      .subscribe((res: any) => {
        this.router.navigate(['login'])
        this.form.reset()
        formDirective.resetForm()
        this.tabGroupRef.selectedIndex = 0
        this.openSnackBar('Вы успешно зарегистрировались', 'OK')
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
