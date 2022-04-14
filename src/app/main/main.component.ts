import {Component, OnDestroy, OnInit} from '@angular/core';
import { LastFmService } from "../services/lastFm.service";
import { TopTracksList, Track } from "../interfaces/interface";
import {delay, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

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
        delay(1000),
        takeUntil(this.destroy)
      ).subscribe((data: TopTracksList) => {
      this.topTracks = data.tracks?.track;
      this.topTracks?.map(track => track.artist = track.artist.name).sort((a, b) => b.listeners - a.listeners);
      this.isLoading = false;
    });
  }
}
