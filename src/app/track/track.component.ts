import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Track } from "../interfaces/interface";
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  @Input() track!: Track;
  @Input() index!: number;
  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  constructor(private localStorageService: LocalStorageService) {
  }

  get number(): number {
    return this.index + 1;
  }

  onClick(link: string) {
    window.open(link);
  }

  addToFavorite(track: Track) {
    this.localStorageService.setTracksToStorage(track);
    this.handleClick.emit();
  }
}
