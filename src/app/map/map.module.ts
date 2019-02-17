import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, MatRippleModule } from '@angular/material';
import { SharedModule } from '@app/shared/shared.module';
import { MapGeolocationControlComponent, MapSearchbarControlComponent } from './controls';
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { MapService } from './map.service';

@NgModule({
  declarations: [
    MapComponent,
    MapGeolocationControlComponent,
    MapSearchbarControlComponent
  ],
  imports: [
    SharedModule,
    MapRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule
  ],
  providers: [MapService]
})
export class MapModule { }
