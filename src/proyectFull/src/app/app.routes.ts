import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserHomeGuard } from './components/user-home/user-home.guard';

const app_routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: UsersComponent},
    {path: 'user-home', component: UserHomeComponent,canActivate: [UserHomeGuard]},
    {path: '**', pathMatch: 'full', redirectTo: ''}
];

export const app_routing = RouterModule.forRoot(app_routes);