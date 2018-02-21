import { Component, OnInit } from '@angular/core';

import { Villain } from '../models/villain';
import { VILLAINS } from '../app-data/mock-villains';
import { VillainService } from './../villain.service';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})
export class VillainsComponent implements OnInit {
  villains: Villain[];

  constructor(private villainService: VillainService) { }

  ngOnInit() {
    this.getVillains();
  }

  getVillains(): void {
    //this.villains = this.villainService.getVillains();
    this.villainService.getVillains().subscribe(villains => this.villains = villains);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.villainService.addVillain({ name } as Villain)
      .subscribe(villain => { this.villains.push(villain)});
  }

  delete(villain: Villain): void {
    this.villains = this.villains.filter(v => v !== villain);
    this.villainService.deleteVillain(villain).subscribe();
  }
  // villain: Villain = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  // villains = VILLAINS;
  // selectedVillain: Villain;

  // onSelect(villain: Villain): void {
  //   this.selectedVillain = villain;
  // }

}
