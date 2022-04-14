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

  onClick(link: string) {
    window.open(link);
  }
}
