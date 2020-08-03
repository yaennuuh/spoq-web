import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileaudioPageRoutingModule } from './mobileaudio-routing.module';

import { MobileaudioPage } from './mobileaudio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileaudioPageRoutingModule
  ],
  declarations: [MobileaudioPage]
})
export class MobileaudioPageModule {}
