import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchTracks, TopTracks } from "../interfaces/interface";

@Injectable()
export class LastFmService {
  readonly baseUrl: string = 'https://ws.audioscrobbler.com/2.0/';
  private apiKey: string = '21861bfc40e3a5164b1d4652b9b5f65f';

  constructor(private http: HttpClient) { }

  getSearchedTracks(track: string) {
    return this.http.get<SearchTracks>(`${this.baseUrl}/?method=track.search&track=${track}&api_key=${this.apiKey}&format=json`);
  }

  getTopTracks() {
    return this.http.get<TopTracks>(`${this.baseUrl}/?method=chart.gettoptracks&limit=20&api_key=${this.apiKey}&format=json`);
  }
}
