import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvestorComponent } from './components/investor/investor.component';
import { StartupListComponent } from './components/startupList/startupList.component';

import { routes } from './investor.routes';

// Import material design module
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    InvestorComponent,
    StartupListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ]
})

export class InvestorModule {
  static routes = routes; 
}
