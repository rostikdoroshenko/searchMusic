import { Component, OnDestroy, OnInit } from '@angular/core';
import { LastFmService } from "../services/lastFm.service";
import { Track } from "../interfaces/interface";
import { delay, map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  topTracks: Track[] | undefined = [];
  isLoading: boolean = false;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private lastFmService: LastFmService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getTopTracks();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  getTopTracks() {
    return this.lastFmService.getTopTracks()
      .pipe(
        map(data => data.tracks?.track),
        delay(1000),
        takeUntil(this.destroy)
      ).subscribe((tracks: Track[]) => {
        this.topTracks = tracks;
        this.topTracks
          .map(track => track.artist = track.artist.name)
          .sort((a, b) => b.listeners - a.listeners);
        this.isLoading = false;
      });
  }
}
