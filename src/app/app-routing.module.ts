import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathNotFoundComponent } from '@app/components';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninModule' },
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
