import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full',
  },
  {
    path: 'blog',
    loadChildren: () => import("./modules/blog/blog.module").then((m) => m.BlogModule)
  },
  {
    path: 'book',
    loadChildren: () => import("./modules/book/book.module").then((m) => m.BookModule)
  },
  {
    path: 'profile',
    loadChildren: () => import("./modules/user/user.module").then((m) => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
