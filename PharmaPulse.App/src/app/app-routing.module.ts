import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'medicines',
    pathMatch:"full"
  },
  {
    path: 'medicines',
    loadChildren: () =>
      import('./features/medicines/medicine.routes').then(
        (m) => m.MEDICINE_ROUTES
      )
  },
  {
    path: 'sale-history',
    loadChildren: () =>
      import('./features/sales-history/sales.routes').then(
        (m) => m.SALES_ROUTES
      )
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
