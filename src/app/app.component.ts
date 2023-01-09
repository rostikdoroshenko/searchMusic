import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {actions} from "./store/actions";
import {AppFacade} from "./store/facade";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store, public appFacade: AppFacade) {
  }

  ngOnInit() {
    this.store.dispatch(actions.loadFavorite());
  }
}
