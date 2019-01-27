import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { SharedModule } from '@app/shared/shared.module';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    SigninRoutingModule,
    SharedModule,
    MatButtonModule,
  ]
})
export class SigninModule { }
