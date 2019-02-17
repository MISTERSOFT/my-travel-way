import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, MatRippleModule } from '@angular/material';
import { LayoutModule } from '@app/layout/layout.module';
import { SharedModule } from '@app/shared/shared.module';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book.routing';
import { BookDetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    BookComponent,
    BookDetailsComponent
  ],
  imports: [
    SharedModule,
    BookRoutingModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
  ]
})
export class BookModule { }
