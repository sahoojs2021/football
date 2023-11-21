import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fixture, FixtureApiResponseDto } from '../models/fixture.model';


@Injectable({
  providedIn: 'root',
})

export class FixtureService{
    private fixtureObs = new BehaviorSubject<Array<Fixture>>([]);
    fixtureResponse$ = this.fixtureObs.asObservable();

    public baseUrl:string;
    constructor(private http: HttpClient) {
        this.baseUrl= environment.baseUrl;
    }

    /**
     * @author:
     * @argument: leagueId, teamId, season are required
     * @description: fetching fixture data from API according to above parameter
     **/
    public getFixtureData(leagueId:number, teamId:number, season:number):Observable<FixtureApiResponseDto>{
        let apiUrl= `${this.baseUrl}/fixtures?league=${leagueId}&season=${season}&team=${teamId}`;
        return this.http.get<FixtureApiResponseDto>(apiUrl);

        // for testing only
        // return this.http.get<FixtureApiResponseDto>('assets/fixture.json');
    }

    /**
     * @author:
     * @argument:
     * @description:
     **/
    public cacheFixtureResponse(resPonse: Array<Fixture>):void{
        if(resPonse.length){        
            const sortData = this.sortFixtureData(resPonse);
            this.fixtureObs.next(sortData);
        }else{
            this.fixtureObs.next([]);
        }
    }

    /**
     * @auther
     * @description: Sort the fixtures array based on timestamp in descending order. Get the latest 10 fixtures
     **/
    public sortFixtureData(fixturesData: Array<Fixture>): Array<Fixture>{        
        const sortedFixtures = fixturesData.sort((a, b) => b.fixture.timestamp - a.fixture.timestamp);
        return sortedFixtures.slice(0, 10);
    }

}