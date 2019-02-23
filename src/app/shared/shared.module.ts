import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatRippleModule } from '@angular/material';
import { FileUploaderComponent } from './file-uploader';
import { MapGeolocationControlComponent, MapSearchbarControlComponent } from './map/controls';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { TruncatePipe } from './pipes';

@NgModule({
  declarations: [
    FileUploaderComponent,
    TruncatePipe,
    MapComponent,
    MapGeolocationControlComponent,
    MapSearchbarControlComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploaderComponent,
    MapComponent,
  ],
  providers: [MapService]
})
export class SharedModule { }
