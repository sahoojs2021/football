import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FootballService } from 'src/app/shared/services/football.service';
import { ToastrService } from 'ngx-toastr';
import { LeagueInfo} from 'src/app/shared/models/standing-dto.model';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit{
  ngUnsubscribe = new Subject();
  response$:Observable<LeagueInfo | null>;
  

  leagueId:number;
  currentYear: number;
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private footballService: FootballService,
    private toastr: ToastrService
    ){
      
      const currentDate = new Date();
      this.currentYear = currentDate.getFullYear();
      this.response$ = this.footballService.response$;

  }

  /**
   *@author:
   *@description: getting leagueId based on active menu. then fetching standing data from API based on leagueId
   ***/
  public ngOnInit(){
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((routeParams) => {
      this.leagueId = routeParams['id'] || 39;
      this.getLeagueData();          
    });    
  }

  /**
   *@author:
   *@description: first checking standing data in cache, if data is available in cache and fetching from cache otherwise fetching data from API then storing data in cache.
   * **/
  public getLeagueData(){
    if(this.footballService.checkCountryDataInCache(this.leagueId)){
      this.footballService.getStandingDataByLeagueId(this.leagueId);

    }else{   
      this.footballService
      .getFootballStandings(this.leagueId, this.currentYear)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        if(data.response.length){
          this.footballService.setStandingResponse(this.leagueId, data.response[0].league);
        }
        this.footballService.getStandingDataByLeagueId(this.leagueId);
        
      }); 
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next(1);
    this.ngUnsubscribe.complete();
  }

}
