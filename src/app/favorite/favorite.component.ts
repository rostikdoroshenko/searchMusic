import { Component, OnInit } from '@angular/core';
import { Track } from "../interfaces/interface";
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteTracks: Track[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.addOrDeleteFavorite();
  }

  addOrDeleteFavorite() {
    this.favoriteTracks = this.localStorageService.getTracksFromStorage();
  }
}
