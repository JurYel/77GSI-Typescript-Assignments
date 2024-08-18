import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './pages/book-list/book-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookRoutingModule } from './book-routing.module';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class BookModule { }
