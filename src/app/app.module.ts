import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { LastFmService } from './services/lastFm.service';
import { MainComponent } from './main/main.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoaderComponent } from './loader/loader.component';
import { TrackComponent } from './track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MainComponent,
    LoaderComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LastFmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
