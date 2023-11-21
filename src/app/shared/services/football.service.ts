import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StandingsDataDto, LeagueInfo, StandingDto } from '../models/standing-dto.model';


@Injectable({
  providedIn: 'root',
})
export class FootballService {
    private standingObs = new BehaviorSubject<StandingDto>({});
    standing$ = this.standingObs.asObservable();

    private responseObs = new BehaviorSubject<LeagueInfo | null>(null);
    response$ = this.responseObs.asObservable();
    
    public baseUrl:string="";

    constructor(private http: HttpClient) {
        this.baseUrl= environment.baseUrl;
    }

    /**
     * @author:
     * @argument: league id and current season is required
     * @description: fetching data from API according to LeagueID and Season
     **/
    public getFootballStandings(league:number, season:number):Observable<StandingsDataDto> {  
        let apiUrl= `${this.baseUrl}/standings?league=${league}&season=${season}`;
        return this.http.get<StandingsDataDto>(apiUrl); 

        // for testing only
        // return this.http.get<StandingsDataDto>('assets/mock.json');
    }

    /**
     * @author:
     * @argument: leagueId and data is required
     * @description: storing data in Cache according to leagueId, eg: {39: {id:39, name:'league'}}
     **/
    public setStandingResponse(leagueId:number, data:LeagueInfo){
        const oldVal = this.getStandingResponse();
        const newVal={... oldVal, [leagueId]: data}
        this.standingObs.next(newVal);
    }

    /**
     * @author:
     * @argument: not required
     * @description: return all data stored in cache in leagueId wise, eg: {39: {id:39, name:'league'}}
     **/
    public getStandingResponse():StandingDto{
        return this.standingObs.value;
    }

    /**
     * @author:
     * @argument: leagueId is required
     * @description: check data in cache, if data is available against the leagueId. then method return true otherwise return false;
     **/
    public checkCountryDataInCache(leagueId:number):boolean{
        const oldVal = this.getStandingResponse();
        if(oldVal){
            const keyExists = oldVal.hasOwnProperty(leagueId);
            if(keyExists){
                return true;
            }
        }        
        return false;
    }
    /**
     * @author:
     * @argument: leagueId required
     * @description: get data from cache for particular leagueId, then store the final data to another cache. Actual showing these final data in UI
     **/
    public getStandingDataByLeagueId(leagueId:number):void{
        const oldVal = this.getStandingResponse();
        if(oldVal[leagueId] !== undefined){
            this.responseObs.next(oldVal[leagueId]);
        }else{
            this.responseObs.next(null);
        }
        
    }
  
}
