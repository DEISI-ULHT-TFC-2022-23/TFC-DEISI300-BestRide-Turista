import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuard } from '../shared/CanActivateGuard';

import { CommentTripPage } from './comment-trip.page';

const routes: Routes = [
  {
    path: '',
    component: CommentTripPage,
    canActivate: [CanActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentTripPageRoutingModule {}
