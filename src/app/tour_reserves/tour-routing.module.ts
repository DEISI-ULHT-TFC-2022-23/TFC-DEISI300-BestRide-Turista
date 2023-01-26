import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuard } from '../shared/CanActivateGuard';

import { TourPage } from './tour.page';

const routes: Routes = [
  {
    path: '',
    component: TourPage,
    canActivate: [CanActivateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioPageRoutingModule {}
