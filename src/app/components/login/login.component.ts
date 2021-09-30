import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(private api: ApiService, private router: Router) {
    this.form = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.api.login(this.form.value)
      .subscribe(() => {
        this.router.navigate([''])
      })
  }

}
