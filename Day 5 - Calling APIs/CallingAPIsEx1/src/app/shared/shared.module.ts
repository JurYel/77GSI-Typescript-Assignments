import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandBarComponent } from './components/command-bar/command-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ItemCommandBarComponent } from './components/item-command-bar/item-command-bar.component';



@NgModule({
  declarations: [
    CommandBarComponent,
    HeaderComponent,
    ItemCommandBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CommandBarComponent, HeaderComponent, ItemCommandBarComponent]
})
export class SharedModule { }
