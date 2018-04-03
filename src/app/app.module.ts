import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutes } from './app-routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiTickerService } from './api-ticker.service';
import { IntercepterHttp } from './http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterHttp,
      multi: true
    },
    ApiTickerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
