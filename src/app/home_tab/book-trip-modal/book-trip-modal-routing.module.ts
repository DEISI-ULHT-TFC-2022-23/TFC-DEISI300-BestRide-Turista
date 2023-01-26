import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuard } from 'src/app/shared/CanActivateGuard';

import { BookTripModalPage } from './book-trip-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BookTripModalPage,
    canActivate: [CanActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookTripModalPageRoutingModule {}
