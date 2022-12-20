import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TablesComponent, MainComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    SharedModule,
    SidebarModule,
    RouterModule,
  ],
})
export class TablesModule {}
