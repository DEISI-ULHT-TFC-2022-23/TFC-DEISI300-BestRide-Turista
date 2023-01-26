import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuard } from '../shared/CanActivateGuard';

import { DadosContaPage } from './user-tab.page';
const routes: Routes = [
  {
    path: '',
    component: DadosContaPage,
    canActivate: [CanActivateGuard]
  },
  {
    path: 'reset-password-modal',
    loadChildren: () =>
      import('./reset-password-modal/reset-password-modal.module').then(
        (m) => m.ResetPasswordModalPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DadosContaPageRoutingModule {}
