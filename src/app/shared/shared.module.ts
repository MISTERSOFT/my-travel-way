import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FileUploaderComponent } from './file-uploader';
import { TruncatePipe } from './pipes';

@NgModule({
  declarations: [
    FileUploaderComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploaderComponent,
  ]
})
export class SharedModule { }
