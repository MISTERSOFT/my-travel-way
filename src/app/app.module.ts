import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { componentDeclarations } from '@app/components';
import { environment } from '@environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    componentDeclarations
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
