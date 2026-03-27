
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Dashboard } from './dashboard/dashboard';

 export const routes: Routes = [
  { path: '', component: Dashboard }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}