import { Pipe, PipeTransform } from "@angular/core";
import { Score } from "../models/score.model";

@Pipe({ name: "getScore" })
export class GetScorePipe implements PipeTransform {
    transform(value: Score, stype:string): number {
        if(!value){
            return 0;
        }
        if(stype==='home'){
            return (value.fulltime.home + value.halftime.home) ;
        }else{
            return (value.fulltime.away + value.halftime.away);
        }
    }
}
