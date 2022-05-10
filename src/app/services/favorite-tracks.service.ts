import { Injectable } from '@angular/core';
import { Track } from "../interfaces/interface";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FavoriteTracksService {
  private readonly favoriteTracksURL: string = 'https://favorite-tracks-default-rtdb.europe-west1.firebasedatabase.app/tracks.json';
  favoriteTracks: Track[] = [];
  error$: Subject<string> = new Subject<string>();

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
    return this.http.get<Track[]>(this.favoriteTracksURL)
      .pipe(
        catchError(this.handleError<Track[]>([]))
      );
  }

  updateData(data: any): Observable<Track[]> {
    return this.http.put<Track[]>(this.favoriteTracksURL, data)
      .pipe(
        catchError(this.handleError<Track[]>([]))
    );
  }

  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.error$.next(error);
      return of(result as T);
    }
  }
}
