import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathNotFoundComponent } from '@app/components';
import { AuthGuard, SkipSigninGuard } from '@app/core/auth';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninModule', canActivateChild: [SkipSigninGuard] },
  { path: 'map', loadChildren: './map/map.module#MapModule', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'book', loadChildren: './book/book.module#BookModule', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
