import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [DetailsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailsPageRoutingModule,
        SharedModule
    ]
})
export class DetailsPageModule {}
