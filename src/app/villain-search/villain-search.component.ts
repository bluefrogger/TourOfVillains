import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Villain } from './../models/villain';
import { VillainService } from './../villain.service';

@Component({
  selector: 'app-villain-search',
  templateUrl: './villain-search.component.html',
  styleUrls: ['./villain-search.component.css']
})
export class VillainSearchComponent implements OnInit {
  villains$: Observable<Villain[]>;
  private searchTerms = new Subject<string>();

  constructor(private villainService: VillainService) { }

  ngOnInit(): void {
    this.villains$ = this.searchTerms.pipe(
    // wait 300ms after each keystroke before considering the term
    debounceTime(300),

    // ignore the new term if same as previous term
    distinctUntilChanged(),

    // switch to new search observable each time the term changes
    switchMap((term: string) => this.villainService.searchVillains(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
