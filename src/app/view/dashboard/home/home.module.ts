import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardModule } from '../dashboard.module';
import { TablesComponent } from '../tables/tables.component';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { CardFourComponent } from './card-four/card-four.component';
import { CardOneComponent } from './card-one/card-one.component';
import { CardThreeComponent } from './card-three/card-three.component';
import { CardTwoComponent } from './card-two/card-two.component';

@NgModule({
  declarations: [
    HomeComponent,
    CardOneComponent,
    CardTwoComponent,
    CardThreeComponent,
    CardFourComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    HomeComponent,
    CardOneComponent,
    CardTwoComponent,
    CardThreeComponent,
    CardFourComponent,
  ],
})
export class HomeModule {}
