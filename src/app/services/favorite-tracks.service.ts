import { Injectable } from '@angular/core';
import { Track } from "../interfaces/interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteTracksService {
  private readonly favoriteTracksURL: string = 'https://favorite-tracks-default-rtdb.europe-west1.firebasedatabase.app/tracks.json';

  constructor(private http: HttpClient) {}

  updateFavorites(track: Track, favoriteList: Track[], isEqual: boolean): Observable<Track[]> {
    let updateFavoriteList: Track[];
    let oldList = favoriteList ? [...favoriteList] : [];
    updateFavoriteList = oldList.length && isEqual
      ? oldList.filter(filterTrack => track.url !== filterTrack.url)
      : [track, ...oldList];

    return this.updateData(updateFavoriteList);
  }

  getData(): Observable<Track[]> {
    return this.http.get<Track[]>(this.favoriteTracksURL);
  }

  updateData(data: any): Observable<Track[]> {
    return this.http.put<Track[]>(this.favoriteTracksURL, data);
  }
}
