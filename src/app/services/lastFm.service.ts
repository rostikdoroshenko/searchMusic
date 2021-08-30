import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LastFmService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=21861bfc40e3a5164b1d4652b9b5f65f&format=json`);
  }
}
