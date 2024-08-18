import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookFormComponent } from './pages/book-form/book-form.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'form/:action/:id',
    component: BookFormComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class BookRoutingModule { }
