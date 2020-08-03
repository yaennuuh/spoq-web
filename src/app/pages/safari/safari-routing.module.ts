import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafariPage } from './safari.page';

const routes: Routes = [
  {
    path: '',
    component: SafariPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafariPageRoutingModule {}
