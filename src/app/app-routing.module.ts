import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', component: TodoPageComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
