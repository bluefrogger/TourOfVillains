import { Component, OnInit } from '@angular/core';
import { VillainService } from './../villain.service';
import { Villain } from './../models/villain';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  villains: Villain[];

  constructor(private villainService: VillainService) { }

  getVillains(): void {
    this.villainService.getVillains().subscribe(villains => this.villains = villains.slice(1, 5));
  }

  ngOnInit() {
    this.getVillains();
  }

}
