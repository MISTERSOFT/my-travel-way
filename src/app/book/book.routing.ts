import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookDetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: BookComponent },
  { path: ':bookId', component: BookDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class BookRoutingModule { }
