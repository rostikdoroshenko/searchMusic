import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchTracks, TopTracks } from "../interfaces/interface";
import { map } from "rxjs/operators";

@Injectable()
export class LastFmService {
  readonly baseUrl: string = 'https://ws.audioscrobbler.com/2.0/';
  readonly limit: string = 'limit=10';
  private apiKey: string = '21861bfc40e3a5164b1d4652b9b5f65f';

  constructor(private http: HttpClient) { }

  getSearchedTracks(track: string) {
    return this.http
      .get<SearchTracks>(
      `${this.baseUrl}/?method=track.search&track=${track}&${this.limit}&api_key=${this.apiKey}&format=json`)
      .pipe(
        map(data => data.results.trackmatches.track
          .sort((a, b) => b.listeners - a.listeners)
          .map(track => {
            track.image = track.image[3]["#text"];
            delete track.streamable;
            return track;
          })
        )
      );
  }

  getTopTracks() {
    return this.http
      .get<TopTracks>(
        `${this.baseUrl}/?method=chart.gettoptracks&${this.limit}&api_key=${this.apiKey}&format=json`)
      .pipe(
        map(data => data.tracks?.track
          .sort((a, b) => b.listeners - a.listeners)
          .map(track => {
            track.artist = track.artist.name;
            track.image = track.image[3]["#text"];
            delete track.streamable;
            return track;
          })),
      );
  }
}
