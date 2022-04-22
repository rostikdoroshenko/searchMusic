import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Track } from "../interfaces/interface";
import { FavoriteTracksService } from "../services/favorite-tracks.service";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  @Input() track!: Track;
  @Input() index!: number;
  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  constructor(private favoriteTracksService: FavoriteTracksService) {
  }

  get number(): number {
    return this.index + 1;
  }

  isUrlEqual(url: string): boolean {
    return this.favoriteTracksService.isUrlEqual(url);
  }

  onClick(link: string): void {
    window.open(link);
  }

  editFavorite(track: Track): void {
    this.handleClick.emit(track);
  }
}
