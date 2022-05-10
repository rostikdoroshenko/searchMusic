import {Component, OnInit} from '@angular/core';
import { FavoriteTracksService } from "./services/favorite-tracks.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'searchMusic';

  constructor(public favoriteService: FavoriteTracksService) {
  }

  ngOnInit() {
    this.favoriteService.getData().subscribe(data => {
      this.favoriteService.favoriteTracks = data || [];
    });
  }
}
