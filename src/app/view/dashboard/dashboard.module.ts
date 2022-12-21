import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { TablesComponent } from './tables/tables.component';
import { HotelService } from '../service/hotel-service.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [DashboardComponent, FormsComponent, TablesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
    HomeModule,
  ],
  providers: [HotelService],
})
export class DashboardModule {}
