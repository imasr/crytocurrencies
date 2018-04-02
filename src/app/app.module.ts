import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutes } from './app-routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClient } from 'selenium-webdriver/http';
import { ApiTicketService } from './api-ticket.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ApiTicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
