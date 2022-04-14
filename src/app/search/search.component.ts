import { Component, OnDestroy, OnInit } from '@angular/core';
import { LastFmService } from '../services/lastFm.service';
import { FormControl, FormGroup } from "@angular/forms";
import { Track } from "../interfaces/interface";
import { Subject} from "rxjs";
import { map, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  searchTracksList: Track[] = [];
  isPending: boolean = false;
  isLoaded: boolean = false;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private lastFmService: LastFmService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'searchControl': new FormControl(null)
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  onSubmit() {
    this.isPending = true;
    const inputValue: string = this.searchForm.controls['searchControl'].value;
    this.lastFmService.getSearchedTracks(inputValue)
      .pipe(
        map(data => data.results.trackmatches.track),
        takeUntil(this.destroy)
      ).subscribe(
      (tracks: Track[]) => {
        this.searchTracksList = tracks;
        this.isPending = false;
        this.isLoaded = true;
      }
    );
  }
}
