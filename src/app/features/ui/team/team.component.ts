import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Fixture } from 'src/app/shared/models/fixture.model';
import { FixtureService } from 'src/app/shared/services/fixture.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{
  leagueId:number;
  teamId:number;
  currentYear: number;

  fixtureResponse$:Observable<Array<Fixture>>;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private fixtureService: FixtureService
    ) {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.fixtureResponse$= this.fixtureService.fixtureResponse$;
  }

  /**
   *@author:
   *@description: getting leagueId and teamId from route params then fetching fixtures data from API based on leagueId and teamId
   * **/
  public ngOnInit(){
    this.route.params.subscribe(params => {
      this.leagueId= params['lid'];
      this.teamId= params['tid'];

      this.fixtureService.getFixtureData(this.leagueId, this.teamId, this.currentYear).subscribe((data)=>{
        this.fixtureService.cacheFixtureResponse(data.response);
      });
    });
  }

  public goBack(){
    this.router.navigate(['standing', this.leagueId]);
  }
}
