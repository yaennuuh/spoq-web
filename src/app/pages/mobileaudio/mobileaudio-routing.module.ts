import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileaudioPage } from './mobileaudio.page';

const routes: Routes = [
  {
    path: '',
    component: MobileaudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileaudioPageRoutingModule {}
