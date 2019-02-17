import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatRippleModule } from '@angular/material';
import { LayoutModule } from '@app/layout/layout.module';
import { SharedModule } from '@app/shared/shared.module';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book.routing';
import { BookDetailsComponent } from './details/details.component';
import { BookFormComponent } from './shared';

@NgModule({
  declarations: [
    BookComponent,
    BookDetailsComponent,
    BookFormComponent
  ],
  imports: [
    SharedModule,
    BookRoutingModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatDialogModule,
  ],
  entryComponents: [
    BookFormComponent
  ]
})
export class BookModule { }
