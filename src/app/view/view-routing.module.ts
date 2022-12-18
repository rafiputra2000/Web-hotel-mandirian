import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            },
            {
                path: '',
                loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
            },
            {
                path: '',
                loadChildren: () => import('./forms/forms.module').then(m => m.FormsBookingModule)
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
