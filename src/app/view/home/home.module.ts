import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainModule } from './main/main.module';
import { HomeRoutingModule } from './home-routing.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainModule,
    HomeRoutingModule,
    SidebarModule,
    RouterModule
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
