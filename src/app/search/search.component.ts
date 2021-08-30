import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../services/lastFm.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private lastFmService: LastFmService) { }

  ngOnInit(): void {
    this.lastFmService.getData().subscribe(
      data => console.log(data)
    )
  }

}
