import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { CardOneComponent } from './card-one/card-one.component';
import { CardTwoComponent } from './card-two/card-two.component';
import { CardThreeComponent } from './card-three/card-three.component';
import { CardFourComponent } from './card-four/card-four.component';



@NgModule({
  declarations: [MainComponent, CardOneComponent, CardTwoComponent, CardThreeComponent, CardFourComponent],
  imports: [
    CommonModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
