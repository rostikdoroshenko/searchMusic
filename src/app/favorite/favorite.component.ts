import { Component } from '@angular/core';
import { Track } from "../interfaces/interface";
import {Store} from "@ngrx/store";
import {AppFacade} from "../store/facade";
import {actions} from "../store/actions";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {

  constructor(
    private store: Store,
    public appFacade: AppFacade
  ) {}

  updateFavoriteList(track: Track) {
    this.store.dispatch(actions.updateFavorite({track}));
  }
}
