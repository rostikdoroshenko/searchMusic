import { Component, Input } from '@angular/core';
import { Track } from "../interfaces/interface";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  @Input() track!: Track;
  @Input() index!: number;

  get number(): number {
    return this.index + 1;
  }

  onClick(link: string) {
    window.open(link);
  }
}
