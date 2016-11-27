import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChiefComponent } from './components/chief/chief.component';

import { routes } from './chief.routes';

// Import material design module
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    ChiefComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ]
})

export class ChiefModule {
  static routes = routes; 
}
