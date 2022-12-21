import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  {
    path: 'table',
    component: TablesComponent,
  },
  {
    path: 'form',
    component: FormsComponent,
  },
  {
    path: 'form/:id',
    component: FormsComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
