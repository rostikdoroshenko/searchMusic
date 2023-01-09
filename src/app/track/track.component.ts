import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Track } from "../interfaces/interface";
import {Store} from "@ngrx/store";
import {isUrlEqual} from "../store/selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  @Input() track!: Track;
  @Input() index!: number;
  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  constructor(public store: Store) {}

  get number(): number {
    return this.index + 1;
  }

  isUrlEqual(url: string): Observable<boolean> {
    return this.store.select(isUrlEqual(url));
  }

  onClick(link: string): void {
    window.open(link);
  }

  editFavorite(track: Track): void {
    this.handleClick.emit(track);
  }
}
