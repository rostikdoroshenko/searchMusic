import {Component, OnInit } from '@angular/core';
import { Track } from "../interfaces/interface";
import {Observable } from "rxjs";
import {actions} from "../store/actions";
import {Store} from "@ngrx/store";
import {AppFacade} from "../store/facade";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  topTracks$!: Observable<Track[]>;

  constructor(
    private store: Store,
    public appFacade: AppFacade) {
    this.topTracks$ = this.appFacade.getTopTracks$;
  }

  ngOnInit(): void {
    this.getTopTracks();
  }

  updateFavoriteList(track: Track): void {
    this.store.dispatch(actions.updateFavorite({track}));
  }

  getTopTracks(): void {
    this.store.dispatch(actions.loadTopTracks());
  }
}
