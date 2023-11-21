import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './ui/menu/menu.component';
import { RouterModule } from '@angular/router';
import { FootballService } from './services/football.service';
import { FixtureService } from './services/fixture.service';




@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    MenuComponent
  ],
  providers:[FootballService, FixtureService]
})
export class SharedModule { }
