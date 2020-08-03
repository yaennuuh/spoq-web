import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafariPageRoutingModule } from './safari-routing.module';

import { SafariPage } from './safari.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafariPageRoutingModule
  ],
  declarations: [SafariPage]
})
export class SafariPageModule {}
