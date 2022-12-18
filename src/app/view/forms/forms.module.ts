import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HotelService } from '../service/hotel-service.service';


@NgModule({
  declarations: [FormsComponent, MainComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule,
    SidebarModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    HotelService
  ]
})
export class FormsBookingModule { }
