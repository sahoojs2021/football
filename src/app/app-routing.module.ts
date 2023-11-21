import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import custom component list
import { PageNotFoundComponent } from './features/ui/page-not-found/page-not-found.component';
import { StandingComponent } from './features/ui/standing/standing.component';
import { TeamComponent } from './features/ui/team/team.component';

const routes: Routes = [
  { path: 'standing/:id', component: StandingComponent},
  { path: 'standing', component: StandingComponent},
  {path: 'team/:lid/:tid', component: TeamComponent},
  { path: '', redirectTo: 'standing', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
