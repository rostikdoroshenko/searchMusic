import {Component, OnDestroy, OnInit } from '@angular/core';
import { LastFmService } from "../services/lastFm.service";
import { Track } from "../interfaces/interface";
import { takeUntil } from "rxjs/operators";
import {Observable, Subject } from "rxjs";
import { FavoriteTracksService } from "../services/favorite-tracks.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  topTracks$!: Observable<Track[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private lastFmService: LastFmService,
    private favoriteTracksService: FavoriteTracksService) { }

  ngOnInit(): void {
    this.getTopTracks();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateFavoriteList(track: Track): void {
    this.favoriteTracksService.updateFavorites(track).pipe(takeUntil(this.destroy$)).subscribe();
  }

  getTopTracks(): void {
    this.topTracks$ = this.lastFmService.getTopTracks();
  }
}
