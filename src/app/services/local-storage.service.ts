import { Injectable } from '@angular/core';
import { Track } from "../interfaces/interface";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly FAVORITE_TRACKS: string = 'favoriteTracks';
  favoriteTracks: Track[] = this.getTracksFromStorage() || [];

  constructor() {
  }

  setTracksToStorage(track: Track) {
    if (!this.favoriteTracks.length) {
      this.favoriteTracks.push(track);
    } else {
      this.favoriteTracks
        .map(mapTrack => mapTrack.url)
        .includes(track.url)
          ? this.favoriteTracks = this.favoriteTracks.filter(filterTrack => track.url !== filterTrack.url)
          : this.favoriteTracks.push(track);
    }
    localStorage.setItem(this.FAVORITE_TRACKS, JSON.stringify(this.favoriteTracks));
    this.getTracksFromStorage();
  }

  getTracksFromStorage() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(this.FAVORITE_TRACKS));
  }
}
