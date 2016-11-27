import { Routes } from '@angular/router';
import { AuthenticateGuard } from './shared/services/auth.service';
import { NoContentComponent } from './shared/components/no-content/no-content.component';


export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthenticateGuard],
    canLoad: [AuthenticateGuard],
    loadChildren: './modules/+login/login.module#LoginModule'
  },
  {
    path: 'startup/:id/employee',
    canActivate: [AuthenticateGuard],
    canLoad: [AuthenticateGuard],
    loadChildren: './modules/+employee/employee.module#EmployeeModule'
  },
  {
    path: 'startup/:id/chief',
    canActivate: [AuthenticateGuard],
    canLoad: [AuthenticateGuard],
    loadChildren: './modules/+chief/chief.module#ChiefModule'
  },
  {
    path: 'investor',
    canActivate: [AuthenticateGuard],
    canLoad: [AuthenticateGuard],
    loadChildren: './modules/+investor/investor.module#InvestorModule'
  },
  { 
    path: '**', 
    component: NoContentComponent
  }
  
];
