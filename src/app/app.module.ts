import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { LastFmService } from './services/lastFm.service';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from "@angular/forms";
import { LoaderComponent } from './loader/loader.component';
import { TrackComponent } from './track/track.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ErrorComponent } from './error/error.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {metaReducers, reducers} from "./store/state";
import {Effects} from "./store/effects";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    LoaderComponent,
    TrackComponent,
    FavoriteComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([Effects])
  ],
  providers: [LastFmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
