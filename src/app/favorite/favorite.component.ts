import { Component, OnDestroy, OnInit } from '@angular/core';
import { Track } from "../interfaces/interface";
import { FavoriteTracksService } from "../services/favorite-tracks.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnDestroy, OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  favoriteTracks$!: Observable<Track[]>;
  isLoading: boolean = false;

  constructor(public favoriteTracksService: FavoriteTracksService) { }

  ngOnInit() {
    this.getFavorites();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFavorites() {
    this.isLoading = true;
    this.favoriteTracks$ = this.favoriteTracksService.getData();
    this.favoriteTracks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isLoading = false;
    });
  }

  updateFavoriteList(track: Track) {
    this.favoriteTracksService.updateFavorites(track)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getFavorites();
    });
  }
}
