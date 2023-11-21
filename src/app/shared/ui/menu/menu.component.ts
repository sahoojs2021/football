import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  routingEvents$: Observable<NavigationEnd>;
  activeIndex: number;
  showMenu:boolean=true;
  navItems: Array<Menu> = [
    { id: 'england', label: 'England', leagueId: 39 },
    { id: 'spain', label: 'Spain', leagueId: 140 },
    { id: 'germany', label: 'Germany', leagueId: 78 },
    { id: 'france', label: 'France', leagueId: 61 },
    { id: 'italy', label: 'Italy', leagueId: 135 },
  ];
  constructor(private router: Router){
    this.routingEvents$ = this.router.events.pipe(filter(element => element instanceof NavigationEnd)) as Observable<NavigationEnd>;


  }

  ngOnInit(): void {
    this.routingEvents$.subscribe(activatedUrl=>{
      const rurl= activatedUrl.url;
      if (rurl.includes('team')) {
        this.showMenu=false;
      } else {
        this.showMenu=true;
      }
  })
  }

  public setActiveIndex(index: number) {
    this.activeIndex = index;
  }

}
