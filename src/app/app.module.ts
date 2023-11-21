import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

// import custom component list
import { PageNotFoundComponent } from './features/ui/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { CustomHttpInterceptor } from './core/interceptors/custom-http.interceptor';
import { StandingComponent } from './features/ui/standing/standing.component';
import { TeamComponent } from './features/ui/team/team.component';
import { GetScorePipe } from './features/pipes/score.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    StandingComponent,
    TeamComponent,
    GetScorePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   NgbModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
