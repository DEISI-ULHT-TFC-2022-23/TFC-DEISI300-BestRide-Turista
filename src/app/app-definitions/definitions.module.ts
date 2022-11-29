import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefinicoesPageRoutingModule } from './definitions-routing.module';

import { DefinicoesPage } from './definitions.page';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DefinicoesPageRoutingModule,
    MaterialModule,
  ],
  declarations: [DefinicoesPage],
})
export class DefinicoesPageModule {}
