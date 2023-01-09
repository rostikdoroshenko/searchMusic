import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Track } from "../interfaces/interface";
import {actions} from "../store/actions";
import {Store} from "@ngrx/store";
import {AppFacade} from "../store/facade";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  searchForm!: UntypedFormGroup;
  searchTracksList$!: Observable<Track[]>;

  constructor(
    private store: Store,
    public appFacade: AppFacade
  ) { this.searchTracksList$ = this.appFacade.getSearchedTracks$ }

  ngOnInit(): void {
    this.initForm();
  }

  updateFavoriteList(track: Track) {
    this.store.dispatch(actions.updateFavorite({track}));
  }

  initForm() {
    this.searchForm = new UntypedFormGroup({
      'searchControl': new UntypedFormControl(null)
    });
  }

  onSubmit() {
    const trackName: string = this.searchForm.controls['searchControl'].value;
    this.store.dispatch(actions.loadSearchedTracks({trackName}));
  }
}
