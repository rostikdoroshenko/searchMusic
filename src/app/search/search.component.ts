import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FavoriteTracksService } from "../services/favorite-tracks.service";
import { LastFmService } from '../services/lastFm.service';
import { Track } from "../interfaces/interface";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  searchForm!: FormGroup;
  isLoading: boolean = false;
  searchTracksList$!: Observable<Track[]>;

  constructor(
    private lastFmService: LastFmService,
    private cdr: ChangeDetectorRef,
    private favoriteTracksService: FavoriteTracksService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateFavoriteList(track: Track) {
    this.favoriteTracksService.updateFavorites(track).pipe(takeUntil(this.destroy$)).subscribe();
  }

  initForm() {
    this.searchForm = new FormGroup({
      'searchControl': new FormControl(null)
    });
  }

  onSubmit() {
    this.isLoading = true;
    const inputValue: string = this.searchForm.controls['searchControl'].value;
    this.searchTracksList$ = this.lastFmService.getSearchedTracks(inputValue);
    this.searchTracksList$.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
  }
}
