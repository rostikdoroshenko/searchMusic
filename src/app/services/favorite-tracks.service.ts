import { Injectable } from '@angular/core';
import { Track } from "../interfaces/interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteTracksService {
  private readonly favoriteTracksURL: string = 'https://favorite-tracks-default-rtdb.europe-west1.firebasedatabase.app/tracks.json';
  favoriteTracks: Track[] = [];

  constructor(private http: HttpClient) {}

  updateFavorites(track: Track): Observable<Track[]> {
    this.favoriteTracks.length && this.isUrlEqual(track.url)
      ? this.favoriteTracks = this.favoriteTracks.filter(filterTrack => track.url !== filterTrack.url)
      : this.favoriteTracks.unshift(track);

    return this.updateData(this.favoriteTracks);
  }

  isUrlEqual(url: string): boolean {
    return this.favoriteTracks.map(track => track.url).includes(url);
  }

  getData(): Observable<Track[]> {
    return this.http.get<Track[]>(this.favoriteTracksURL);
  }

  updateData(data: any): Observable<Track[]> {
    return this.http.put<Track[]>(this.favoriteTracksURL, data);
  }
}
